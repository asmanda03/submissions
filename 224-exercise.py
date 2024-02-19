class SerialGenerator:
    """
    Serial number generator, you initialize it with a start number:
    >>> serial = SerialGenerator(start=100)
    """
    def __init__(self,start):
        self.start = start 
        self.next = start
    
    def generate(self):
        """
        Every time you ask for a new number, it should return the next sequential number:
        >>> serial.generate()
            100

        >>> serial.generate()
            101

        >>> serial.generate()
            102
        """
        self.next += 1
        return self.next - 1
    
    def reset(self):
        """
        You should provide a function to reset the number back to the original start number:

        >>> serial.reset()

        >>> serial.generate()
            100
        """
        self.next = self.start
###############################################################################################
from random import randint
class WordFinder:
    def __init__(self,path):
        self.path = path
        file = open(self.path)
        self.wrdlst(file)
    def wrdlst(self, file):
        self.word_list = []
        for line in file:
            self.word_list.append(line.strip())#strip() gets rid of \n char
        file.close()
        print(f"{len(self.word_list)} words read")
        #print(self.word_list)
    def random(self):
        x = len(self.word_list)
        self.rand_word = self.word_list[randint(0,x-1)]
        return self.rand_word
#####################################################################################################
class SpecialWordFinder(WordFinder):
    def __init__(self,path):
        super().__init__(path)
    def random(self):
        super().random()
        return [self.rand_word]
        # self.rand_word.strip()
        # if not self.rand_word == '' and not self.rand_word.startswith('#'):
        #     return self.rand_word