/**
 * @fileoverview ESPHome ZeroCode - Visual YAML Generator
 *
 * A React application for generating ESPHome configurations without coding.
 * Features board selection, component picker, live YAML preview, and GPIO visualization.
 *
 * @module App
 */

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Components
import {
  Header,
  BoardPreview,
  CompPicker,
  CompCard,
  YAMLViewer,
  Field,
  Select,
  Toggle,
} from "./components";

// Constants
import { BOARD_DB, getBoardByValue } from "./constants/boards";
import { ALL_COMPONENTS } from "./constants/components";
import { PALETTE } from "./constants/colors";

// Utils
import { generateYAML, downloadYaml } from "./utils/yamlGenerator";
import {
  formatDeviceName,
  extractActiveGpios,
} from "./utils/helpers";

/**
 * Generate board options for select dropdown
 * @returns {Array<{value: string, label: string}>}
 */
function generateBoardOptions() {
  return BOARD_DB.map((b) => ({
    value: b.value,
    label: `[${b.family}] ${b.label}`,
  }));
}

/**
 * Main application component
 *
 * @returns {JSX.Element} Complete ESPHome configurator
 */
function App() {
  // State
  const [boardValue, setBoardValue] = useState("esp32");
  const [deviceName, setDeviceName] = useState("my-esp-device");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [components, setComponents] = useState([]);
  const [services, setServices] = useState({ api: true, ota: true });

  // Derived state with memoization
  const boardDef = useMemo(
    () => getBoardByValue(boardValue) || BOARD_DB[0],
    [boardValue]
  );

  const config = useMemo(
    () => ({
      boardDef,
      deviceName,
      wifiSsid,
      wifiPass,
      components,
      services,
    }),
    [boardDef, deviceName, wifiSsid, wifiPass, components, services]
  );

  const yaml = useMemo(() => generateYAML(config), [config]);
  const activeGpios = useMemo(
    () => extractActiveGpios(components),
    [components]
  );

  const boardOptions = useMemo(() => generateBoardOptions(), []);

  // Handlers
  const handleAddComponent = useCallback((component) => {
    setComponents((prev) => [...prev, component]);
  }, []);

  const handleRemoveComponent = useCallback((id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleUpdateComponent = useCallback((updated) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  }, []);

  const handleDownload = useCallback(() => {
    downloadYaml(yaml, deviceName);
  }, [yaml, deviceName]);

  const handleFlash = useCallback(() => {
    window.open("https://web.esphome.io/", "_blank");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PALETTE.background,
        color: PALETTE.text,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        overflow: "hidden",
      }}
    >
      {/* Global styles */}
      <style>{
        `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.35); border-radius: 2px; }
        input, select, button { font-family: inherit; }
        input[type=password] { letter-spacing: 0.12em; }
        select option { background: #0a1220; }
        `
      }</style>

      <Header boardDef={boardDef} />

      {/* Main 3-column layout */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "340px 1fr 420px",
          height: "calc(100vh - 52px)",
          overflow: "hidden",
        }}
      >
        {/* Left column - Configuration Form */}
        <Sidebar
          boardValue={boardValue}
          onBoardChange={setBoardValue}
          boardOptions={boardOptions}
          deviceName={deviceName}
          onDeviceNameChange={setDeviceName}
          wifiSsid={wifiSsid}
          onWifiSsidChange={setWifiSsid}
          wifiPass={wifiPass}
          onWifiPassChange={setWifiPass}
          services={services}
          onServicesChange={setServices}
          components={components}
          onAddComponent={handleAddComponent}
          onRemoveComponent={handleRemoveComponent}
          onUpdateComponent={handleUpdateComponent}
          onDownload={handleDownload}
          onFlash={handleFlash}
        />

        {/* Center column - Board Preview */}
        <PreviewPanel
          boardDef={boardDef}
          activeGpios={activeGpios}
        />

        {/* Right column - YAML Output */}
        <div
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <YAMLViewer yaml={yaml} deviceName={deviceName} />
        </div>
      </div>
    </div>
  );
}

/**
 * Sidebar configuration panel
 *
 * @param {Object} props - Panel props
 */
function Sidebar({
  boardValue,
  onBoardChange,
  boardOptions,
  deviceName,
  onDeviceNameChange,
  wifiSsid,
  onWifiSsidChange,
  wifiPass,
  onWifiPassChange,
  services,
  onServicesChange,
  components,
  onAddComponent,
  onRemoveComponent,
  onUpdateComponent,
  onDownload,
  onFlash,
}) {
  const wifiIndicator = wifiSsid.length > 2;

  return (
    <div
      style={{
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "rgba(6,11,20,0.7)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: PALETTE.primary,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          Configuration
        </div>
        <div
          style={{ fontSize: 12, color: PALETTE.textDark }}
        >
          Generate ESPHome YAML without coding
        </div>
      </div>

      {/* Scrollable form content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Board selection */}
        <section>
          <SectionHeader icon="⚙️" label="Module" />
          <div style={{ display: "grid", gap: 10 }}>
            <Select
              label="Board"
              value={boardValue}
              onChange={onBoardChange}
              options={boardOptions}
            />
            <Field
              label="Device Name"
              value={deviceName}
              onChange={onDeviceNameChange}
              placeholder="my-esp-device"
            />
          </div>
        </section>

        {/* WiFi settings */}
        <section>
          <SectionHeader
            icon="📶"
            label="WiFi"
            indicator={wifiIndicator}
          />
          <div style={{ display: "grid", gap: 10 }}>
            <Field
              value={wifiSsid}
              onChange={onWifiSsidChange}
              placeholder="your_wifi_ssid"
            />
            <Field
              value={wifiPass}
              onChange={onWifiPassChange}
              type="password"
              placeholder="••••••••"
            />
          </div>
        </section>

        {/* Services */}
        <section>
          <SectionHeader icon="🛡️" label="Services" />
          <div style={{ display: "grid", gap: 8 }}>
            <Toggle
              label="Native API"
              desc="For Home Assistant (no encryption)"
              value={services.api}
              onChange={(v) =>
                onServicesChange((s) => ({ ...s, api: v }))
              }
            />
            <Toggle
              label="Over-the-Air"
              desc="Wireless updates (no password)"
              value={services.ota}
              onChange={(v) =>
                onServicesChange((s) => ({ ...s, ota: v }))
              }
            />
          </div>
        </section>

        {/* Components */}
        <section>
          <div
            style={{
              fontSize: 10,
              color: "#a78bfa",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>🧩</span> COMPONENTS
            <span
              style={{
                marginLeft: "auto",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 100,
                padding: "1px 8px",
                fontSize: 10,
                color: "#a78bfa",
              }}
            >
              {components.length} / {ALL_COMPONENTS.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {components.map((comp) => (
              <CompCard
                key={comp.id}
                comp={comp}
                onRemove={() => onRemoveComponent(comp.id)}
                onChange={onUpdateComponent}
              />
            ))}
          </AnimatePresence>

          <CompPicker onAdd={onAddComponent} />
        </section>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <ActionButton
          onClick={onDownload}
          variant="secondary"
          icon="⬇"
        >
          Export YAML
        </ActionButton>

        <ActionButton
          onClick={onFlash}
          variant="primary"
          icon="⚡"
        >
          Flash Online
        </ActionButton>
      </div>
    </div>
  );
}

/**
 * Section header with icon
 */
function SectionHeader({ icon, label, indicator }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: PALETTE.primary,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span>{icon}</span> {label}
      {indicator && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: PALETTE.success,
            boxShadow: `0 0 6px ${PALETTE.success}`,
            marginLeft: "auto",
          }}
        />
      )}
    </div>
  );
}

/**
 * Action button component
 */
function ActionButton({ children, onClick, variant, icon }) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 8,
        cursor: "pointer",
        background: isPrimary
          ? "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.15))"
          : "rgba(99,102,241,0.08)",
        border: isPrimary
          ? "1px solid rgba(139,92,246,0.3)"
          : "1px solid rgba(99,102,241,0.2)",
        color: isPrimary ? "#c4b5fd" : PALETTE.primaryLight,
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: isPrimary ? 600 : 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (isPrimary) {
          e.currentTarget.style.background =
            "linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))";
        } else {
          e.currentTarget.style.background = "rgba(99,102,241,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isPrimary
          ? "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.15))"
          : "rgba(99,102,241,0.08)";
      }}
    >
      {icon} {children}
    </button>
  );
}

/**
 * Board preview center panel
 */
function PreviewPanel({ boardDef, activeGpios }) {
  const hasGpios = activeGpios.length > 0;

  return (
    <div
      style={{
        position: "relative",
        background: "#060c18",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Title overlay */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#1e3a5a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {boardDef?.family} Preview
        </div>
        {hasGpios && (
          <div
            style={{
              fontSize: 10,
              color: "#00e5ff",
              fontFamily: "monospace",
              marginTop: 3,
            }}
          >
            {activeGpios.length} GPIO active
            {activeGpios.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* SVG preview */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BoardPreview
          boardDef={boardDef}
          activeGpios={activeGpios}
        />
      </div>

      {/* Board info footer */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10,
          color: "#1e3a5a",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
        }}
      >
        {boardDef?.label} · {boardDef?.platform}
      </div>
    </div>
  );
}

export default App;
