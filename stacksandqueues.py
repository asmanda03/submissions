#queues

class Queue:
    def __init__(self):
        self._queue = []

    def enqueue(self, item):
        """Add an item to the end of the queue."""
        self._queue.append(item)

    def dequeue(self):
        """Remove and return the item at the front of the queue."""
        if self.is_empty():
            raise IndexError("Dequeue from an empty queue.")
        return self._queue.pop(0)

    def peek(self):
        """Return the item at the front of the queue without removing it."""
        if self.is_empty():
            raise IndexError("Peek from an empty queue.")
        return self._queue[0]

    def is_empty(self):
        """Check if the queue is empty."""
        return len(self._queue) == 0

    def __repr__(self):
        return f"Queue({self._queue})"

# Example usage:
q = Queue()
q.enqueue(1)
q.enqueue(2)
print(q)  # Queue([1, 2])
print(q.dequeue())  # 1
print(q.peek())  # 2
print(q.is_empty())  # False
print(q.dequeue())  # 2
print(q.is_empty())  # True


#stacks
class Stack:
    def __init__(self):
        self._stack = []

    def push(self, item):
        """Add an item to the top of the stack."""
        self._stack.append(item)

    def pop(self):
        """Remove and return the item at the top of the stack."""
        if self.is_empty():
            raise IndexError("Pop from an empty stack.")
        return self._stack.pop()

    def peek(self):
        """Return the item at the top of the stack without removing it."""
        if self.is_empty():
            raise IndexError("Peek from an empty stack.")
        return self._stack[-1]

    def is_empty(self):
        """Check if the stack is empty."""
        return len(self._stack) == 0

    def __repr__(self):
        return f"Stack({self._stack})"

# Example usage:
s = Stack()
s.push(1)
s.push(2)
print(s)  # Stack([1, 2])
print(s.pop())  # 2
print(s.peek())  # 1
print(s.is_empty())  # False
print(s.pop())  # 1
print(s.is_empty())  # True

