
import os

def create_component_directory(component_name):
    # Create the directory
    os.makedirs(component_name, exist_ok=True)
    print(f"Directory created: {component_name}")

    # Define file names and their paths
    index_file = os.path.join(component_name, "index.js")
    jsx_file = os.path.join(component_name, f"{component_name}.jsx")
    css_file = os.path.join(component_name, f"{component_name}Style.css")

    # Contents for each file
    index_content = f"export {{ default }} from './{component_name}';\n"

    jsx_content = f"import React from 'react';\nimport './{component_name}Style.css';\n\nconst {component_name} = () => \n    return (\n        <div className=\"{component_name}\">\n            \n        </div>\n    );\n;\n\nexport default {component_name};\n"

    css_content = f".{component_name} {{\n    /* Add your styles here */\n}}\n"

    # Create and write to each file
    with open(index_file, "w") as index:
        index.write(index_content)
        print(f"File created: {index_file}")

    with open(jsx_file, "w") as jsx:
        jsx.write(jsx_content)
        print(f"File created: {jsx_file}")

    with open(css_file, "w") as css:
        css.write(css_content)
        print(f"File created: {css_file}")

if __name__ == "__main__":
    # Prompt user for the component name
    component_name = input("Enter the name of the component: ").strip()
    
    # Create the component directory and files
    create_component_directory(component_name)
