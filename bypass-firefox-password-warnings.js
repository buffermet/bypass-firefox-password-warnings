const PASSWORD_FIELDS = document.querySelectorAll("input[type=password]");
const ALLOWED_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 `-=~!@#$%^&*()_+[]\\;',./{}|:\"<>?";
for (var i = 0; i < PASSWORD_FIELDS.length; i++) {
	const PASSWORD_FIELD = PASSWORD_FIELDS[i];
	const SPOOFED_FIELD = PASSWORD_FIELD.cloneNode(true);
	SPOOFED_FIELD.id = SPOOFED_FIELD.id + parseInt(Math.random() * 9999);
	SPOOFED_FIELD.name = SPOOFED_FIELD.name + parseInt(Math.random() * 9999);
	SPOOFED_FIELD.type = "text";
	PASSWORD_FIELD.type = "text";
	PASSWORD_FIELD.value = "";
	SPOOFED_FIELD.addEventListener("keydown", async(EVENT)=>{
		const CURSOR_START = SPOOFED_FIELD.selectionStart;
		const CURSOR_END = SPOOFED_FIELD.selectionEnd;
		if (!EVENT.ctrlKey && EVENT.keyCode != 16 && EVENT.keyCode != 18 && EVENT.keyCode != 9 && EVENT.keyCode != 37 && EVENT.keyCode != 39) {
			if (EVENT.keyCode == 8) {
				EVENT.preventDefault();
				if (CURSOR_START != CURSOR_END) {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END);
					PASSWORD_FIELD.value = PASSWORD_FIELD.value.substr(0, CURSOR_START) + PASSWORD_FIELD.value.substr(CURSOR_END);
					SPOOFED_FIELD.selectionStart = CURSOR_START;
					SPOOFED_FIELD.selectionEnd = CURSOR_START;
				} else {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START-1) + SPOOFED_FIELD.value.substr(CURSOR_END);
					PASSWORD_FIELD.value = PASSWORD_FIELD.value.substr(0, CURSOR_START-1) + PASSWORD_FIELD.value.substr(CURSOR_END);
					SPOOFED_FIELD.selectionStart = CURSOR_START > 0 ? (CURSOR_START-1) : 0;
					SPOOFED_FIELD.selectionEnd = CURSOR_START > 0 ? (CURSOR_START-1) : 0;
				}
			} else if (EVENT.keyCode == 46) {
				EVENT.preventDefault();
				if (CURSOR_START != CURSOR_END) {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END);
					PASSWORD_FIELD.value = PASSWORD_FIELD.value.substr(0, CURSOR_START) + PASSWORD_FIELD.value.substr(CURSOR_END);
				} else {
					SPOOFED_FIELD.value = SPOOFED_FIELD.value.substr(0, CURSOR_START) + SPOOFED_FIELD.value.substr(CURSOR_END+1);
					PASSWORD_FIELD.value = PASSWORD_FIELD.value.substr(0, CURSOR_START) + PASSWORD_FIELD.value.substr(CURSOR_END+1);
				}
				SPOOFED_FIELD.selectionStart = CURSOR_START;
				SPOOFED_FIELD.selectionEnd = CURSOR_START;
			} else if (ALLOWED_CHARS.indexOf(EVENT.key) != -1) {
				EVENT.preventDefault();
				PASSWORD_FIELD.value = PASSWORD_FIELD.value.substr(0, CURSOR_START) + EVENT.key + PASSWORD_FIELD.value.substr(CURSOR_END);
				SPOOFED_FIELD.value = "•".repeat(PASSWORD_FIELD.value.length);
				SPOOFED_FIELD.selectionStart = CURSOR_START+1;
				SPOOFED_FIELD.selectionEnd = CURSOR_START+1;
			}
		}
	});
	PASSWORD_FIELD.before(SPOOFED_FIELD);
	PASSWORD_FIELD.style.display = "none";
}
