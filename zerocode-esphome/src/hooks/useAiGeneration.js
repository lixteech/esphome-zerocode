import { useState, useCallback, useRef } from "react";
import { generateConfig, validateYAML } from "../utils/aiApi";

export function useAiGeneration(options = {}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedYaml, setGeneratedYaml] = useState("");
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [validation, setValidation] = useState({ valid: true, errors: [], hasComponents: false });

  const lastPromptRef = useRef(null);
  const abortControllerRef = useRef(null);

  const generateFromPrompt = useCallback(async (userPrompt, generateOptions = {}) => {
    if (!userPrompt || userPrompt.trim().length === 0) {
      setError("Prompt cannot be empty");
      return null;
    }

    setIsGenerating(true);
    setError(null);
    lastPromptRef.current = userPrompt;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const yaml = await generateConfig(userPrompt, {
        ...generateOptions,
        signal: abortControllerRef.current.signal,
      });

      const validationResult = validateYAML(yaml);
      setValidation(validationResult);

      if (!validationResult.valid) {
        setError(`Validation failed: ${validationResult.errors.join(", ")}`);
      }

      setGeneratedYaml(yaml);
      setPrompt("");

      const historyEntry = {
        id: Date.now(),
        prompt: userPrompt,
        yaml,
        timestamp: new Date().toISOString(),
        valid: validationResult.valid,
      };

      setHistory((prev) => [historyEntry, ...prev].slice(0, 10));

      return yaml;
    } catch (err) {
      const errorMessage = err.message || "Failed to generate configuration";
      setError(errorMessage);
      console.error("AI generation error:", err);
      return null;
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, []);

  const retry = useCallback(() => {
    if (lastPromptRef.current) {
      return generateFromPrompt(lastPromptRef.current);
    }
    setError("No previous prompt to retry");
    return null;
  }, [generateFromPrompt]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const loadFromHistory = useCallback((historyId) => {
    const entry = history.find((h) => h.id === historyId);
    if (entry) {
      setGeneratedYaml(entry.yaml);
      setPrompt(entry.prompt);
      const validationResult = validateYAML(entry.yaml);
      setValidation(validationResult);
      return entry;
    }
    return null;
  }, [history]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  }, []);

  const reset = useCallback(() => {
    setPrompt("");
    setGeneratedYaml("");
    setError(null);
    setValidation({ valid: true, errors: [], hasComponents: false });
    lastPromptRef.current = null;
  }, []);

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedYaml,
    setGeneratedYaml,
    error,
    validation,
    history,
    generateFromPrompt,
    retry,
    clearError,
    clearHistory,
    loadFromHistory,
    cancel,
    reset,
  };
}