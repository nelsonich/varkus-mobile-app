import { apiGet, apiPost } from "../services/http";

export function getLoan() {
    return apiGet("/api/loan");
}

export function userRequest({
    fullName,
    email,
    salary,
    selectedLoanId,
    loanAmount,
    loanDeadline,
}) {
    return apiPost(
        "/api/loan",
        {},
        {
            fullName,
            email,
            salary,
            selectedLoanId,
            loanAmount,
            loanDeadline,
        }
    );
}
