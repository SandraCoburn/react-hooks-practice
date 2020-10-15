def Reverse(input):
    total = ""
    for char in input:
        total = char + total

    return total
print(Reverse("Reverse"))