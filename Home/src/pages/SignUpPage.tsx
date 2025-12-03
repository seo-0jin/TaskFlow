import { useState } from "react";
import { RoutePath } from "../const/RoutePath";
import { route } from "../utils/RouteUtil";
import { useSignUpViewModel } from "../viewmodels/useSignUpViewModel";
import { AlertPopup } from "../components/popup/AlertPopup";

const SignUpPage = () => {
    const { state, setLoginId, setPassword, setName, setPhone, setPosition, submit } = useSignUpViewModel();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async () => {
        const ok = await submit();
        if (ok) {
            setAlertMessage("회원가입이 완료되었습니다.");
            setAlertOpen(true);
        }
    };

    const handleConfirmAlert = () => {
        setAlertOpen(false);
        route(RoutePath.LOGIN);
    };

    return (
        <>
            <div>
                <input
                    value={state.loginId}
                    onChange={e => setLoginId(e.target.value)}
                    placeholder="아이디"
                />
                {state.error && <div style={{ color: "red" }}>{state.error}</div>}
                <input
                    type="password"
                    value={state.password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <input
                    value={state.name}
                    onChange={e => setName(e.target.value)}
                    placeholder="이름"
                />
                <input
                    value={state.phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="핸드폰 번호"
                />
                {/* 추후 드롭다운으로 변경 */}
                <input
                    value={state.position}
                    onChange={e => setPosition(e.target.value)}
                    placeholder="직위"
                />

                <button type="button" onClick={handleSubmit} disabled={state.loading}>
                    {state.loading ? "처리 중..." : "회원가입"}
                </button>
            </div>

            <AlertPopup
                open={alertOpen}
                message={alertMessage}
                onConfirm={handleConfirmAlert}
            />
        </>
    );
};

export default SignUpPage;
