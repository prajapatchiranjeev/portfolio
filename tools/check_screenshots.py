
from pathlib import Path
from PIL import Image

ROOT = Path("assets/projects")

for folder in sorted(ROOT.iterdir()):
    if not folder.is_dir():
        continue

    print(f"\nProject: {folder.name}")

    for filename in ("desktop.jpg", "mobile.jpg", "fullpage.jpg"):
        path = folder / filename

        if not path.exists():
            print(f"  MISSING: {filename}")
            continue

        try:
            with Image.open(path) as img:
                width, height = img.size
                ratio = width / height

                print(
                    f"  {filename}: {width}x{height}, "
                    f"aspect ratio={ratio:.2f}"
                )

                if filename == "mobile.jpg" and ratio < 0.45:
                    print(
                        "    WARNING: Image is unusually tall. "
                        "Check whether this is a full-page screenshot."
                    )

        except Exception as error:
            print(f"  ERROR: {filename}: {error}")
