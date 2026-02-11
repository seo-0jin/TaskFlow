import styles from '@/scss/base.module.scss';
import Button from '../common/Button';
import { useTemplatePopupVM } from '../../viewmodels/useTemplatePopupVM';
import TemplateItemRow from '../parts/TemplateItemRow';

export type TemplatePopupMode = 'create' | 'edit';

type TemplatePopupProps = {
  open: boolean;
  // templateName: string;
  // onChangeTemplateName: (v: string) => void;
  // description: string;
  // issueStatus: IssueStatusValue[];
  // roles: ProjectRoleValue[];
  mode: TemplatePopupMode;
  onClose: () => void;
  onSubmit: () => void;
};

export const TemplatePopup = ({ open, mode, onClose, onSubmit }: TemplatePopupProps) => {
  if (!open) return null;

  const {
    statusList,
    statusTypeList,
    priorityList,
  } = useTemplatePopupVM();

  return (
    <div className={`${styles.popup}`}>
      <div className={styles.bg_wrap}></div>
      <div className={`${styles.layerpop} ${styles.pop_big}`}>
        <div className={styles.pophead}>
          <h3 className={styles.pophead_tit}>{mode === 'create' ? '템플릿 추가' : '템플릿 수정'}</h3>
        </div>
        <div className={styles.popbody}>
          {/* 기본 정보 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📋</span>
              기본 정보
            </h3>
            <div className={styles.form_row}>
              <label className={styles.form_label}>
                템플릿 이름<span className={styles.required}>*</span>
              </label>
              <input className={styles.form_input} placeholder='예: 기본 개발 프로젝트 템플릿' />
            </div>
            <div className={styles.form_row}>
              <label className={styles.form_label}>설명</label>
              <textarea
                className={styles.form_textarea}
                placeholder='이 템플릿의 사용 목적과 주요 특징을 설명해주세요'
              ></textarea>
            </div>
          </div>

          {/* 이슈 상태 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📋</span>
              이슈 상태<span className={styles.required}>*</span>
            </h3>
            <div className={styles.item_wrap}>
              {statusList.items.map((item) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onDelete={statusList.removeItem}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => statusList.createItem()} >
                <span>+</span>
                상태 추가
              </button>
            </div>
          </div>

          {/* 이슈 타입 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📋</span>
              이슈 타입<span className={styles.required}>*</span>
            </h3>
            <div className={styles.item_wrap}>
              {statusTypeList.items.map((item) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onDelete={statusTypeList.removeItem}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => statusTypeList.createItem()} >
                <span>+</span>
                상태 추가
              </button>
            </div>
          </div>

          {/* 우선 순위 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📋</span>
              우선순위<span className={styles.required}>*</span>
            </h3>
            <div className={styles.item_wrap}>
              {priorityList.items.map((item) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onDelete={priorityList.removeItem}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => priorityList.createItem()} >
                <span>+</span>
                상태 추가
              </button>
            </div>
          </div>

          {/* 역할/권한 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📋</span>
              역할 & 권한
            </h3>
            <span className={styles.form_hint}>각 역할에 부여할 권한을 선택하세요</span>
            <div className={styles.permission_matrix}>
              <div className={styles.matrix_header}>
                <div>권한</div>
                <div>PM</div>
                <div>DEV</div>
                <div>QA</div>
                <div>VIEWER</div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>프로젝트 설정 수정</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>멤버 초대/삭제</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>이슈 생성</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>이슈 수정</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>이슈 삭제</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} /></div>
              </div>
              <div className={styles.matrix_row}>
                <div className={styles.permission_name}>코멘트 작성</div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
                <div className={styles.role_checkbox}><input type="checkbox" className={styles.checkbox} defaultChecked /></div>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.popfoot}>
          <Button text={'취소'} variant='text' onClick={onClose}></Button>
          <Button text={'템플릿 저장'} onClick={onSubmit}></Button>
        </div>
      </div>
    </div>
  );
};
