var messages = {
    search: {
        success: {
            title: "조회 완료",
            body: "데이터 조회를 완료했습니다.",
        },
        error: {
            title: "조회 실패",
            body: "데이터 조회 도중 오류가 발생했습니다.",
        },
    },
    add: {
        parent: {
            unsaved: {
                title: "추가 실패",
                body: "부모 데이터를 먼저 저장 해주세요.",
            },
            unfocused: {
                title: "선택된 부모 데이터 오류",
                body: "선택된 부모 데이터가 존재하지 않습니다.",
            },
        },
    },
    save: {
        parent: {
            unsaved: {
                title: "저장 실패",
                body: "부모 데이터를 먼저 저장 해주세요.",
            },
            unfocused: {
                title: "선택된 부모 데이터 오류",
                body: "선택된 부모 데이터가 존재하지 않습니다.",
            },
        },
        validation: {
            title: "필수 값 미입력",
            body: "필수 입력 값이 입력되지 않았습니다.",
        },
        success: {
            title: "저장 완료",
            body: "선택된 데이터 저장을 완료했습니다.",
        },
        error: {
            title: "저장 실패",
            body: "데이터 저장 도중 오류가 발생했습니다.",
        },
    },
    delete: {
        confirm: {
            title: "삭제 경고",
            body: "데이터 삭제 후에는 복구할 수 없습니다.\n정말 선택하신 데이터를 삭제 하시겠습니까?",
        },
        success: {
            title: "삭제 완료",
            body: "선택된 데이터 삭제를 완료했습니다.",
        },
        error: {
            title: "삭제 실패",
            body: "데이터 삭제 도중 오류가 발생했습니다.",
        },
    },
    more: {
        checked: {
            title: "선택된 데이터 오류",
            body: "선택된 데이터가 존재하지 않습니다.",
        },
        unknown: {
            title: "알 수 없는 오류",
            body: "알 수 없는 오류가 발생했습니다.",
        },
    },
};
export default messages;
