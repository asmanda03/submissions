#product of numbers

def product(nums):
    # Base case: if array is empty, return 1 (identity for multiplication)
    if not nums:
        return 1
    # Recursive step: multiply the first element with the product of the rest
    return nums[0] * product(nums[1:])

# Example usage:
print(product([2, 3, 4]))  # 24



#longest word
def longest(words):
    # Base case: if list is empty, return 0
    if not words:
        return 0
    # Recursive step: return the maximum length between the first word and the longest of the rest
    return max(len(words[0]), longest(words[1:]))

# Example usage:
print(longest(["hello", "hi", "hola"]))  # 5


#every other character
def everyOther(s):
    # Base case: if the string is empty, return an empty string
    if s == "":
        return ""
    # Recursive step: take the first character and skip the next
    return s[0] + everyOther(s[2:])

# Example usage:
print(everyOther("hello"))  # "hlo"


#is palindrone
def isPalindrome(s):
    # Base case: if the string is empty or a single character, it's a palindrome
    if len(s) <= 1:
        return True
    # Recursive step: check the first and last characters and recurse for the rest
    return s[0] == s[-1] and isPalindrome(s[1:-1])

# Example usage:
print(isPalindrome("tacocat"))  # True
print(isPalindrome("tacodog"))  # False



#find index
def findIndex(arr, target, index=0):
    # Base case: if the list is exhausted, return -1
    if index >= len(arr):
        return -1
    # If the current element matches the target, return the current index
    if arr[index] == target:
        return index
    # Recursive step: check the next index
    return findIndex(arr, target, index + 1)

# Example usage:
animals = ["duck", "cat", "pony"]
print(findIndex(animals, "cat"))  # 1
print(findIndex(animals, "porcupine"))  # -1


#reverse string
def revString(s):
    # Base case: if the string is empty, return an empty string
    if s == "":
        return ""
    # Recursive step: append the last character to the reversed result of the rest
    return s[-1] + revString(s[:-1])

# Example usage:
print(revString("porcupine"))  # "enipucrop"


#gather strings
def gatherStrings(obj):
    strings = []
    
    def gather(obj):
        for key, value in obj.items():
            if isinstance(value, str):
                strings.append(value)
            elif isinstance(value, dict):
                gather(value)

    gather(obj)
    return strings

# Example usage:
nestedObj = {
    "firstName": "Lester",
    "favoriteNumber": 22,
    "moreData": {
        "lastName": "Testowitz"
    },
    "funFacts": {
        "moreStuff": {
            "anotherNumber": 100,
            "deeplyNestedString": {
                "almostThere": {
                    "success": "you made it!"
                }
            }
        },
        "favoriteString": "nice!"
    }
}
print(gatherStrings(nestedObj))  # ["Lester", "Testowitz", "you made it!", "nice!"]

