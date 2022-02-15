import { StackActions, useNavigation } from "@react-navigation/native";

export const useNavigator = () => {
	const navigation = useNavigation();

	const push = (screen: string, params?: Record<string, string | number> ) => {
		navigation.dispatch(StackActions.push(screen, params || {}));
	};

	const goBack = () => navigation.goBack();

	return {
		push,
		goBack,
	};
};
