import axios from "axios";

const TestRulesButton = () => {
    const testRules = () => {
        const data = {
            first_name: 'Test1',
            last_name: 'Test11',
            email: 'test1@test.com',
            phone_number: '0800000000',
            id_card: "1939900337743",
            password: "testtest",
            confirm_password: "testtest",
            is_consent_policy: 1
        }

        axios.post("http://localhost:5000/auction-vcom/us-central1/api/signup", data).then((res) => {
            console.log(res.data);
        });
    }

    return <button onClick={testRules}>Test Rules</button>;
};

export default TestRulesButton;
