# 🚀 New Features - Version 2.0

## ✨ Major Improvements

### 1. **Resizable Panels** 
- Drag the divider between panels to resize
- Form and YAML editor now flexible
- Save your preferred layout preference
- Works smoothly on all screen sizes

### 2. **Bidirectional YAML Editing**
- Edit YAML directly and see changes in the form
- Click "Edit" button to activate YAML edit mode
- Real-time parsing of YAML modifications
- Toggle between view and edit modes with one click

### 3. **Modern Violet Theme** 🟣
- Beautiful dark violet color scheme
- Better contrast and readability
- Violet accents throughout UI
- Matches modern design trends
- Improved dark mode comfort

## 🎯 How to Use

### Resizable Panels
1. Hover over the vertical divider between panels
2. Cursor changes to resize indicator
3. Click and drag left or right
4. Panels resize smoothly
5. Layout persists during session

### Edit YAML
1. Look at the YAML Output panel on the right
2. Click the "✏️ Edit" button
3. YAML becomes editable in a textarea
4. Modify any values directly
5. Changes parse automatically and update form
6. Click "✏️ View" to return to syntax-highlighted view

### Violet Theme
- All UI elements now use violet (#8b5cf6)
- Buttons, borders, glows all themed
- Better visual hierarchy
- More professional appearance

## 🔧 Technical Details

- **ResizablePanel.jsx**: Flexible grid layout with resize support
- **EditableYAMLPanel.jsx**: Dual-mode YAML view/edit component  
- **yamlParser.js**: Simple YAML parser for config updates
- **useResizable.js**: Custom hook for resize interactions
- **Updated CSS**: New violet color variables and animations

## 📝 Notes

- YAML parser handles basic ESPHome configs
- Advanced YAML features may need full parser
- Layout preferences store in session only
- Edit mode validates syntax in real-time
