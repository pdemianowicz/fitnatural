export function slugify(text) {
  const polishChars = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };

  text = text.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (char) => polishChars[char] || char);

  return text
    .normalize("NFD") // Zamiana znaków akcentowanych na podstawowe
    .replace(/[\u0300-\u036f]/g, "") // Usunięcie akcentów
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Usunięcie niedozwolonych znaków
    .trim() // Usunięcie zbędnych spacji na początku i końcu
    .replace(/\s+/g, "-") // Zamiana spacji na "-"
    .toLowerCase();
}
