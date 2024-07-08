#countZeroes

def countZeroes(arr):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # If mid is zero and either it is the first element or the previous is one
        if arr[mid] == 0 and (mid == 0 or arr[mid - 1] == 1):
            return len(arr) - mid
        elif arr[mid] == 1:
            left = mid + 1
        else:
            right = mid - 1
    
    return 0

#sortedFrequency

def sortedFrequency(arr, num):
    def findFirstOccurrence():
        left, right = 0, len(arr) - 1
        first = -1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == num:
                first = mid
                right = mid - 1
            elif arr[mid] < num:
                left = mid + 1
            else:
                right = mid - 1
        return first

    def findLastOccurrence():
        left, right = 0, len(arr) - 1
        last = -1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == num:
                last = mid
                left = mid + 1
            elif arr[mid] < num:
                left = mid + 1
            else:
                right = mid - 1
        return last

    first = findFirstOccurrence()
    if first == -1:
        return -1
    
    last = findLastOccurrence()
    return last - first + 1

#findRotatedIndex
def findRotatedIndex(arr, num):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == num:
            return mid
        
        # Left side is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= num < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right side is sorted
        else:

            if arr[mid] < num <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

#findRotationCount

def findRotationCount(arr):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        if arr[left] <= arr[right]:
            return left
        
        mid = (left + right) // 2
        next = (mid + 1) % len(arr)
        prev = (mid - 1 + len(arr)) % len(arr)
        
        if arr[mid] <= arr[next] and arr[mid] <= arr[prev]:
            return mid
        elif arr[mid] <= arr[right]:
            right = mid - 1
        else:
            left = mid + 1

#findFloor

def findFloor(arr, x):
    left, right = 0, len(arr) - 1
    floor = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] <= x:
            floor = arr[mid]
            left = mid + 1
        else:
            right = mid - 1
    
    return floor
