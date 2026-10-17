import cssutils

# Suppress validation errors (useful for modern CSS)
cssutils.log.setLevel("FATAL")
cssutils.ser.prefs.validate = False  # Disable property validation

css_text = """
/* paste css here */ 

"""

sheet = cssutils.parseString(css_text)

nested = {}

for rule in sheet:
    if rule.type != rule.STYLE_RULE:
        continue
    selectors = rule.selectorText.split(",")
    for selector in selectors:
        selector = selector.strip()
        parts = selector.split(" ", 1)
        base = parts[0]
        nested_selector = parts[1] if len(parts) > 1 else ""
        if base not in nested:
            nested[base] = []
        nested[base].append((nested_selector, rule.style.cssText))

with open("output.css", "w") as f:
    for base, rules in nested.items():
        f.write(f"{base} {{\n")
        for sel, styles in rules:
            if sel:
                f.write(f"  {sel} {{ {styles} }}\n")
            else:
                f.write(f"  {styles}\n")
        f.write("}\n")
