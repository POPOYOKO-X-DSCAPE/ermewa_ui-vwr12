export type LanguageOptions = "ENG" | "FRA" | "GER";

export type DocumentBodyResponse = {
	UPDTIME: string;
	COD: string;
	DOCDATE: string;
	DOCEXPIRE?: string;
	NAT: string;
	URL: string;
	STATE: number;
	STATEDES: {
		FRA: string;
		ENG: string;
		GER: string;
	};
	MEM?: string;
	NAME: {
		BASENAME: string;
		DOCNAME: {
			[lang: string]: string;
		};
	};
	XFILE: {
		PDF: {
			LAN: {
				[lang: string]: {
					UPDTIME: string;
					MASTER: boolean;
					PUB: boolean;
					LEG: boolean;
					URLDET: string;
					URLSHO: string;
				};
			};
		};
	};
	XLINK: {
		UPDTIME: string;
		OBJ: string;
		NAT: string;
		SID: string;
		MASTER: boolean;
		STATE: number;
		STATEDES: {
			FRA: string;
			ENG: string;
			GER: string;
		};
	}[];
};
