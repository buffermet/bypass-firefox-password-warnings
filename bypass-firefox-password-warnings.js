const PASSWORD_FIELDS = document.querySelectorAll("input[type=password]");
const ALLOWED_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 `-=~!@#$%^&*()_+[]\\;',./{}|:\"<>?";

for (var i = 0; i < PASSWORD_FIELDS.length; i++) {
	SPOOFED_FIELD = PASSWORD_FIELDS[i].cloneNode(true);
	SPOOFED_FIELD.type = "text";
	SPOOFED_FIELD.memory = "";

	SPOOFED_FIELD.addEventListener("keydown", async(EVENT)=>{
		const CURSOR_START = SPOOFED_FIELD.selectionStart;
		const CURSOR_END = SPOOFED_FIELD.selectionEnd;

		if (!EVENT.ctrlKey && EVENT.keyCode != 16 && EVENT.keyCode != 18 && EVENT.keyCode != 9 && EVENT.keyCode != 37 && EVENT.keyCode != 39) {
			if (EVENT.keyCode == 8) { // Backspace
				EVENT.preventDefault();
				if (CURSOR_START != CURSOR_END) {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END);
					SPOOFED_FIELD.memory = SPOOFED_FIELD.memory.substr(0, CURSOR_START) + SPOOFED_FIELD.memory.substr(CURSOR_END);
					SPOOFED_FIELD.selectionStart = CURSOR_START;
					SPOOFED_FIELD.selectionEnd = CURSOR_START;
				} else {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START-1) + SPOOFED_FIELD.value.substr(CURSOR_END);
					SPOOFED_FIELD.memory = SPOOFED_FIELD.memory.substr(0, CURSOR_START-1) + SPOOFED_FIELD.memory.substr(CURSOR_END);
					SPOOFED_FIELD.selectionStart = CURSOR_START > 0 ? (CURSOR_START-1) : 0;
					SPOOFED_FIELD.selectionEnd = CURSOR_START > 0 ? (CURSOR_START-1) : 0;
				}
			} else if (EVENT.keyCode == 46) { // Delete
				EVENT.preventDefault();
				if (CURSOR_START != CURSOR_END) {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END);
					SPOOFED_FIELD.memory = SPOOFED_FIELD.memory.substr(0, CURSOR_START) + SPOOFED_FIELD.memory.substr(CURSOR_END);
				} else {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END+1);
					SPOOFED_FIELD.memory = SPOOFED_FIELD.memory.substr(0, CURSOR_START) + SPOOFED_FIELD.memory.substr(CURSOR_END+1);
				}
				SPOOFED_FIELD.selectionStart = CURSOR_START;
				SPOOFED_FIELD.selectionEnd = CURSOR_START;
			} else if (ALLOWED_CHARS.indexOf(EVENT.key) != -1) { // Allowed character
				EVENT.preventDefault();
				SPOOFED_FIELD.memory = SPOOFED_FIELD.memory.substr(0, CURSOR_START) + EVENT.key + SPOOFED_FIELD.memory.substr(CURSOR_END);
				SPOOFED_FIELD.value = "•".repeat(SPOOFED_FIELD.memory.length);
				SPOOFED_FIELD.selectionStart = CURSOR_START+1;
				SPOOFED_FIELD.selectionEnd = CURSOR_START+1;
			}
		}

		console.log("tried to insert " + EVENT.key + " at " + CURSOR_START + ":" + CURSOR_END);
		console.log("remembered: " + SPOOFED_FIELD.memory);
	});

	PASSWORD_FIELDS[i].before(SPOOFED_FIELD);
	PASSWORD_FIELDS[i].remove();
}
