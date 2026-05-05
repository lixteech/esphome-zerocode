/**
 * @fileoverview Constant exports
 *
 * @module constants
 */

// Board definitions
export { BOARD_DB, BOARD_FAMILIES, getBoardByValue, getBoardsByFamily } from './boards';

// Component definitions
export {
  COMPONENT_DB,
  ALL_COMPONENTS,
  CATEGORIES,
  getComponentByType,
  searchComponents,
  getComponentsByCategory,
} from './components';

// Color palettes
export { YAML_COLORS, FAMILY_COLORS, FORM_COLORS, PALETTE } from './colors';

// Pin definitions
export { LEFT_PINS, RIGHT_PINS, BOARD_DIMENSIONS, getPinSpacing, generateGpioOptions, isNumericPin } from './pins';
