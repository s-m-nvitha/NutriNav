import os

KNOWLEDGE_FOLDER = "app/knowledge"


def retrieve_knowledge(question: str):

    question = question.lower()

    knowledge_text = ""

    keywords = {
        "iron": "iron.md",
        "vitamin d": "vitamin_d.md",
        "vitamin b12": "vitamin_b12.md",
        "b12": "vitamin_b12.md",
        "diabetes": "diabetes.md",
        "vegetarian": "vegetarian.md",
        "vegan": "vegetarian.md"
    }

    for keyword, filename in keywords.items():

        if keyword in question:

            filepath = os.path.join(
                KNOWLEDGE_FOLDER,
                filename
            )

            if os.path.exists(filepath):

                with open(
                    filepath,
                    "r",
                    encoding="utf-8"
                ) as f:

                    knowledge_text += (
                        f.read() + "\n\n"
                    )

    return knowledge_text