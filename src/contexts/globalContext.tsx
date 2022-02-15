import React from "react";

interface IGlobalContext {
	isCelsius: boolean;
	changeIsCelsius: () => void;
}

export const GlobalContext = React.createContext<IGlobalContext>({isCelsius: true, changeIsCelsius: ()=>{}});

export const GlobalContextProvider: React.FC = (props) => {
	const { children } = props;

	const [ isCelsius, setIsCelsius ] = React.useState(true);

	const changeIsCelsius = () => {
		setIsCelsius(!isCelsius);
	}

	return (
		<GlobalContext.Provider value={{ isCelsius, changeIsCelsius }}>
			{children}
		</GlobalContext.Provider>
	);
};
