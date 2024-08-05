import json

def txt_to_json(txt_file, json_file):

    with open(txt_file, 'r') as file:
        content = file.read()

    books = {}
    index = 0
    booknum = 0
    paragraphs = content.split('\n\n')
    for quote in paragraphs:
        quote = quote.strip()
        quote = quote.replace('\n', ' ')
        if quote.startswith("BOOK"):
            booknum += 1
            books[booknum] = []
            index = 0
        elif quote.startswith("-"):
            continue
        else:
            index += 1
            books[booknum].append([index, quote])

    with open(json_file, 'w') as json_file:
        json.dump(books, json_file, indent=4)

txt_to_json('meditations.txt', 'meditations.json')