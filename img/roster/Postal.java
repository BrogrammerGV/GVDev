public class Postal {
	int[] code;
	String bar;
	int g = 0;
	int total;
	String zipCode;
	int remaining;
	int y;
	public Postal(int[] postalCode) {
		code = postalCode;
	}

	public Postal(String barCode) {
		bar = barCode;
	}

	String convertToBar() {
		bar = "|";
		for (int x = 0; x < 6; x++) {
			if (x == 5) {
				while ((total + remaining) % 10 != 0) {
					remaining++;
				}
				y=remaining;
			}
			if(x<=4){
			y = code[x];
			total += code[x];
			}
			if (y == 0) {
				bar = bar + "||:::";
			}
			if (y == 1) {
				bar = bar + ":::||";
			}
			if (y == 2) {
				bar = bar + "::|:|";
			}
			if (y == 3) {
				bar = bar + "::||:";
			}
			if (y == 4) {
				bar = bar + ":|::|";
			}
			if (y == 5) {
				bar = bar + ":|:|:";
			}
			if (y == 6) {
				bar = bar + ":||::";
			}
			if (y == 7) {
				bar = bar + "|:::|";
			}
			if (y == 8) {
				bar = bar + "|:|::";
			}
			if (y == 9) {
				bar = bar + "||:::";
			}

		}
		bar = bar + "|";
		return bar;
	}

	String convertToZip() {
		for (int x = 0; x < 22; x+=5) {
			String tempCode = bar.substring(x, x + 5);
			if (tempCode == "||:::") {
				zipCode += 0;
			}
			if (tempCode == ":::||") {
				zipCode += 1;
			}
			if (tempCode == "::|:|") {
				zipCode += 2;
			}
			if (tempCode == "::||:") {
				zipCode += 3;
			}
			if (tempCode == ":|::|") {
				zipCode += 4;
			}
			if (tempCode == ":|:|:") {
				zipCode += 5;
			}
			if (tempCode == ":||::") {
				zipCode += 6;
			}
			if (tempCode == "|:::|") {
				zipCode += 7;
			}
			if (tempCode == "|:|::") {
				zipCode += 8;
			}
			if (tempCode == "||:::") {
				zipCode += 9;
			}
		}
		return zipCode;
	}
}
