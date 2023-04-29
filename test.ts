let boards: (string | undefined)[] = ["sda", undefined, "asd", "asd"];

let selectedBoard: string;

const filteredBoards = boards.filter((b): b is string => b !== undefined);

selectedBoard = filteredBoards[2];
