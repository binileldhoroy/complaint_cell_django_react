from uuid import uuid4
import os


def generateRefCode():
    code = int(uuid4())
    return str(code)[:12]


from django.utils.deconstruct import deconstructible

@deconstructible
class PathAndRename(object):

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return filename

path_and_rename = PathAndRename("/images")


