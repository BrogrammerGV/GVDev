import java.util.Scanner;

public class PostalDriver {
	static String barCode;
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		System.out.println("Is this a Postal Code or a Barcode? (1 for Postal, 2 for Barcode)");
		int answer = input.nextInt();
		if (answer ==1) {
			System.out.println("What is the Postal Code?");
			String postalCode = input.next();
			int[] zipCode = { 0, 0, 0, 0, 0 };
			for (int x = 0; x < 5; x++) {
				int digitX = Integer.parseInt(postalCode.substring(x));
				zipCode[x] = digitX;
			}
			Postal codex = new Postal(zipCode);
			codex.convertToBar();
			System.out.println("Barcode is:"+codex);
		}
		if (answer ==2) {
			System.out.println("What is the Barcode (: and |)");
			barCode = input.next();
			barCode.substring(1, barCode.length()-1);
			Postal barx = new Postal(barCode);
			barx.convertToZip();
			System.out.println("ZipCode is :"+barx);
		}
		input.close();
	}
}
