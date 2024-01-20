def any7(nums):
    """Are any of these numbers a 7? (True/False)"""

    # YOUR CODE HERE 
    for num in nums:
        if num == 7:
            return True
        
    return False

################################################################

def convert_temp(unit_in, unit_out, temp):
    """Convert farenheit <-> celsius and return results.

    - unit_in: either "f" or "c" 
    - unit_out: either "f" or "c"
    - temp: temperature (in f or c, depending on unit_in)

    Return results of conversion, if any.

    If unit_in or unit_out are invalid, return "Invalid unit [UNIT_IN]".

    For example
      convert_temp("c", "f", 0)  =>  32.0
      convert_temp("f", "c", 212) => 100.0
    """

    # YOUR CODE HERE
    if unit_in == 'c' and unit_out == 'f':
      return (temp * 1.8) + 32

    if unit_in =='f' and unit_out == 'c':
        return (temp - 32) * (1/1.8)

    
    if unit_in != 'f' or unit_in != 'c':
        return f'invalid {unit_in}'
    if unit_out != 'f' or unit_out != 'c':
        return f'invalid {unit_out}'
#################################################################

def count_up(start, stop):
    """Print all numbers from start up to and including stop.

    For example:

        count_up(5, 7)

   should print:

        5
        6
        7
    """

    # YOUR CODE HERE
    for num in range(start, stop+1):
        print(num)
###################################################################

def in_range(nums, lowest, highest):
    """Print numbers inside range.

    - nums: list of numbers
    - lowest: lowest number to print
    - highest: highest number to print

    For example:

      in_range([10, 20, 30, 40], 15, 30)

    should print:

      20 fits
      30 fits
    """

    # YOUR CODE HERE
    for num in nums:
        if num >= lowest and num <= highest:
            print(num)
##############################################################

def sum_nums(nums):
    """Given list of numbers, return sum of those numbers.

    For example:
      sum_nums([1, 2, 3, 4])

    Should return (not print):
      10
    """  

    # Python has a built-in function `sum()` for this, but we don't
    # want you to use it. Please write this by hand.

    # YOUR CODE HERE
    sum = 0
    for num in nums:
        sum += num
    return sum
##############################################################

def print_upper_words(words):
    """ Given a list of words, print each word in all caps.

        For example:
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"])

        should print "HELLO", "HEY", "GOODBYE", "YO", "YES"
    """

    #my code here
    for word in words:
        word_in_caps = word.capitalize()
        print(word_in_caps)
################################################################

def print_upper_words_starting_with(words, letters):
        """ Given a list of words, print each word in all caps.

        For example:
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"])

        should print "HELLO", "HEY", "GOODBYE", "YO", "YES"

        Now I am going to print in all caps only the words that begin 
        with the letters specified in the letters set

        For example:
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})

        should print "HELLO", "HEY", "YO", and "YES"
    """

    #my code here
    for letter in letters:
        for word in words:
            if word[0] == letter:
                word_capped = word.capitalize()
                print(word_capped)