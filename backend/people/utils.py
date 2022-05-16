import uuid


def generateRefCode():
    code = int(uuid.uuid4())
    return str(code)[:12]
