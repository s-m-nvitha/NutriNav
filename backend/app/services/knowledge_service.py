import os

KNOWLEDGE_FOLDER = "app/knowledge"

def load_knowledge():

    knowledge_text = ""

    for filename in os.listdir(KNOWLEDGE_FOLDER):

        if filename.endswith(".md"):

            filepath = os.path.join(
                KNOWLEDGE_FOLDER,
                filename
            )

            with open(
                filepath,
                "r",
                encoding="utf-8"
            ) as f:

                knowledge_text += f.read() + "\n\n"

    return knowledge_text