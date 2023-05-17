import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    Input,
    VStack,
    Select,
    CheckIcon,
    useToast,
    HStack,
    Text,
    Spinner,
} from "native-base";
import { getLoan, userRequest } from "../../apis/loan";
import ToastAlert from "../../components/ToastAlert/ToastAlert";

function WelcomeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [loan, setLoan] = useState([]);
    const loadLoanList = useCallback(async () => {
        const request = await getLoan();
        const response = await request.json();
        if (response.status === "success") {
            setLoan(response.loanList);
        }
    }, []);

    useEffect(() => {
        loadLoanList();
    }, []);

    const [fullName, setFullName] = useState("");
    const onFullNameChange = useCallback((value) => {
        setFullName(value);
    }, []);

    const [email, setEmail] = useState("");
    const onEmailChange = useCallback((value) => {
        setEmail(value);
    }, []);

    const [selectedLoan, setSelectedLoan] = useState(null);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const onLoanChange = (id) => {
        setSelectedLoanId(id);
        const selected = loan.filter((item) => item.id === id)[0];
        setSelectedLoan(selected);
        setLoanAmount(selected?.amount.min.toString());
        setLoanDeadline(selected?.deadline.min.toString());
    };

    const [loanAmount, setLoanAmount] = useState("");
    const onLoanAmountChange = useCallback((amount) => {
        setLoanAmount(amount);
    }, []);

    const [loanDeadline, setLoanDeadline] = useState("");
    const onLoanDeadlineChange = useCallback((deadline) => {
        setLoanDeadline(deadline);
    }, []);

    const [salary, setSalary] = useState("");
    const onSalaryChange = useCallback((salary) => {
        setSalary(salary);
    }, []);

    const handleClick = async () => {
        setLoading(true);
        const request = await userRequest({
            fullName,
            email,
            salary,
            selectedLoanId,
            loanAmount,
            loanDeadline,
        });

        const response = await request.json();

        if (response.status === "success") {
            navigation.navigate("Congratulations", {
                name: response.full_name,
            });
        } else {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    return (
                        <Center>
                            <HStack space={2}>
                                <ToastAlert id={id} {...response} />
                            </HStack>
                        </Center>
                    );
                },
            });
        }

        setLoading(false);
    };

    return (
        <ScrollView>
            <Center w="100%">
                <Box safeArea py="3" w="100%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Օնլայն վարկ
                    </Heading>

                    <VStack space={2} mt="1">
                        <FormControl>
                            <FormControl.Label>
                                Անուն Ազգանուն
                            </FormControl.Label>
                            <Input
                                value={fullName}
                                onChangeText={onFullNameChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Էլ․ հասցե</FormControl.Label>
                            <Input value={email} onChangeText={onEmailChange} />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>
                                Աշխատավարձի չափ
                            </FormControl.Label>
                            <Input
                                value={salary}
                                keyboardType="numeric"
                                onChangeText={onSalaryChange}
                            />
                            <FormControl.HelperText
                                _text={{
                                    fontSize: "xs",
                                }}
                            >
                                Մաքուր աշխատավարձ
                            </FormControl.HelperText>
                        </FormControl>

                        <Box>
                            <FormControl.Label>
                                Ընտրել վարկի տեսակ
                            </FormControl.Label>
                            <Select
                                selectedValue={selectedLoanId}
                                minWidth="200"
                                placeholder="Ընտրել վարկի տեսակ"
                                _selectedItem={{
                                    bg: "teal.100",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={onLoanChange}
                            >
                                {loan.map((item, index) => (
                                    <Select.Item
                                        key={`SelectItem-${index}`}
                                        label={item.name}
                                        value={item.id}
                                    />
                                ))}
                            </Select>
                        </Box>

                        {selectedLoan && (
                            <>
                                <FormControl>
                                    <FormControl.Label>
                                        Վարկի գումարը
                                    </FormControl.Label>
                                    <Input
                                        value={loanAmount}
                                        keyboardType="numeric"
                                        onChangeText={onLoanAmountChange}
                                    />
                                    <FormControl.HelperText
                                        _text={{
                                            fontSize: "xs",
                                        }}
                                    >
                                        {`Սկսած՝ ${selectedLoan.amount.min}, մինչև՝ ${selectedLoan.amount.max} դրամ`}
                                    </FormControl.HelperText>
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Ժամկետ
                                    </FormControl.Label>
                                    <Input
                                        value={loanDeadline}
                                        keyboardType="numeric"
                                        onChangeText={onLoanDeadlineChange}
                                    />
                                    <FormControl.HelperText
                                        _text={{
                                            fontSize: "xs",
                                        }}
                                    >
                                        {`Սկսած՝ ${selectedLoan.deadline.min}, մինչև՝ ${selectedLoan.deadline.max} ամիս`}
                                    </FormControl.HelperText>
                                </FormControl>
                            </>
                        )}

                        <Button
                            mt="2"
                            colorScheme="indigo"
                            onPress={handleClick}
                            disabled={loading}
                        >
                            <HStack space={2} justifyContent="center">
                                <Text color={"white"}>Ձևակերպել հայտը</Text>
                                {loading && <Spinner size="sm" />}
                            </HStack>
                        </Button>
                    </VStack>
                </Box>
            </Center>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
});

export default WelcomeScreen;
