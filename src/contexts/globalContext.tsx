import React from "react";

interface IGlobalStore {
	storageKey: string;
}

const GlobalStoreContext = React.createContext<IGlobalStore | null>(null);

export const GlobalStoreProvider: React.FC = (props) => {
	const { children } = props;
    const storageKey = "weatherapp";

	return (
		<GlobalStoreContext.Provider value={{ storageKey }}>
			{children}
		</GlobalStoreContext.Provider>
	);
};
