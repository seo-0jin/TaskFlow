-- 1. 역할 테이블 (권한)
CREATE TABLE roles (
    role_code      VARCHAR(20) PRIMARY KEY,   -- 'ADMIN', 'MANAGER', 'USER' 등
    name_ko        VARCHAR(50) NOT NULL,      -- 관리자, 매니저, 일반사용자
    description    VARCHAR(255),
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 기본 역할 데이터 예시 (INSERT는 필요하면 나중에)
-- INSERT INTO roles(role_code, name_ko, description) VALUES
-- ('ADMIN', '관리자', '전체 시스템 관리'),
-- ('MANAGER', '매니저', '팀/프로젝트 관리'),
-- ('USER', '사용자', '일반 사용자');


-- 2. 사용자 테이블
CREATE TABLE users (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login_id        VARCHAR(50) NOT NULL UNIQUE,  -- 로그인용 아이디
    password        VARCHAR(255) NOT NULL,        -- 해시된 비밀번호
    name            VARCHAR(50) NOT NULL,         -- 이름
    phone           VARCHAR(20),                  -- 핸드폰 번호
    role_code       VARCHAR(20) NOT NULL,         -- FK -> roles
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',  -- ACTIVE / INACTIVE
    last_login_at   TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE users
    ADD CONSTRAINT fk_users_role
        FOREIGN KEY (role_code) REFERENCES roles(role_code);


-- 3. 프로젝트 테이블
CREATE TABLE projects (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'PLANNING',  -- PLANNING / ACTIVE / HOLD / COMPLETED
    owner_id        BIGINT NOT NULL,                          -- 프로젝트 책임자 (PM, 매니저 등)
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE projects
    ADD CONSTRAINT fk_projects_owner
        FOREIGN KEY (owner_id) REFERENCES users(id);


-- 4. 프로젝트 멤버 테이블 (프로젝트 <-> 유저 N:N)
CREATE TABLE project_members (
    project_id  BIGINT NOT NULL,
    user_id     BIGINT NOT NULL,
    role_in_project VARCHAR(50),   -- 프로젝트 내 역할 (예: 'PM', 'Dev', 'QA' 등)
    joined_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (project_id, user_id)
);

ALTER TABLE project_members
    ADD CONSTRAINT fk_project_members_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE;

ALTER TABLE project_members
    ADD CONSTRAINT fk_project_members_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE;


-- 5. 티켓(업무/이슈) 테이블
CREATE TABLE work_requests (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id      BIGINT NOT NULL,             -- FK -> projects
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'TO_DO',     -- TO_DO / IN_PROGRESS / DONE / BLOCKED
    priority        VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',    -- LOW / MEDIUM / HIGH / CRITICAL
    assignee_id     BIGINT,                      -- 담당자 (nullable)
    reporter_id     BIGINT NOT NULL,             -- 생성자
    due_date        DATE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE work_requests
    ADD CONSTRAINT fk_work_requests_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE;

ALTER TABLE work_requests
    ADD CONSTRAINT fk_work_requests_assignee
        FOREIGN KEY (assignee_id) REFERENCES users(id);

ALTER TABLE work_requests
    ADD CONSTRAINT fk_work_requests_reporter
        FOREIGN KEY (reporter_id) REFERENCES users(id);


-- 6. 사용자별 그리드 설정 테이블
--    예: Tickets 페이지에서 어떤 컬럼 숨김/순서/너비를 어떻게 저장할지 JSON으로 보관
CREATE TABLE grid_settings (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         BIGINT NOT NULL,          -- FK -> users
    page_id         VARCHAR(50) NOT NULL,     -- 'tickets', 'projects', 'users' 등 페이지 식별자
    settings_json   JSONB NOT NULL,           -- 컬럼 리스트, 숨김 여부, 순서 등
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE grid_settings
    ADD CONSTRAINT fk_grid_settings_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE;

CREATE UNIQUE INDEX ux_grid_settings_user_page
    ON grid_settings(user_id, page_id);


-- 7. 활동 로그 테이블
CREATE TABLE activity_logs (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         BIGINT,                   -- 누가 (익명일 수도 있으니 NULL 허용 가능)
    action_type     VARCHAR(50) NOT NULL,     -- 'LOGIN', 'CREATE_TICKET', 'UPDATE_PROJECT', ...
    entity_type     VARCHAR(50),              -- 'USER', 'PROJECT', 'TICKET', ...
    entity_id       BIGINT,
    metadata        JSONB,                    -- 추가 정보(변경 전/후 값 등)
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE activity_logs
    ADD CONSTRAINT fk_activity_logs_user
        FOREIGN KEY (user_id) REFERENCES users(id);


-- 8. 유용한 인덱스들 (조회 성능용)
CREATE INDEX idx_tickets_project ON tickets(project_id);
CREATE INDEX idx_tickets_assignee ON tickets(assignee_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_due_date ON tickets(due_date);

CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

INSERT INTO roles(role_code, name_ko, description) VALUES
('ADMIN', '관리자', '전체 시스템 관리자'),
('MANAGER', '매니저', '프로젝트/티켓 관리'),
('USER', '사용자', '일반 사용자');

INSERT INTO users (
    login_id, password, name, phone, role_code, status
)
VALUES (
    'admin01',
    '1234',
    '관리자',
    '01012341234',
    'ADMIN',
    'ACTIVE'
);



