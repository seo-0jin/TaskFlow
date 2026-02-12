import styles from '@/scss/base.module.scss';
import Button from '../common/Button';
import { type TemplatePopupViewModel } from '../../viewmodels/useTemplatePopupVM';
import TemplateItemRow from '../parts/TemplateItemRow';
import { permissionLabel } from '../../data/request/template/PermissionCode';
import type { IssueStatusDef, IssueTypeDef, PriorityDef, RoleDef } from '../../const/ItemContent';

export type TemplatePopupMode = 'create' | 'edit';

type TemplatePopupProps = {
  popupVM: TemplatePopupViewModel
};

export const TemplatePopup = ({
  popupVM
}: TemplatePopupProps) => {
  if (!popupVM.open) return null;

  return (
    <div className={`${styles.popup}`}>
      <div className={styles.bg_wrap}></div>
      <div className={`${styles.layerpop} ${styles.pop_big}`}>
        <div className={styles.pophead}>
          <h3 className={styles.pophead_tit}>{popupVM.mode === 'create' ? '템플릿 추가' : '템플릿 수정'}</h3>
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
              <input className={styles.form_input} placeholder='예: 기본 개발 프로젝트 템플릿' onChange={(e) => popupVM.setTemplateName(e.target.value)} />
            </div>
            <div className={styles.form_row}>
              <label className={styles.form_label}>설명</label>
              <textarea
                className={styles.form_textarea}
                placeholder='이 템플릿의 사용 목적과 주요 특징을 설명해주세요'
                onChange={(e) => popupVM.setTemplateDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* 이슈 상태 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>📊</span>
              이슈 상태<span className={styles.required}>*</span>
            </h3>
            <div className={styles.item_wrap}>
              {popupVM.statusList.items.map((item: IssueStatusDef) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onChangeName={(id, name) => popupVM.statusList.updateName(id, name)}
                  onChangeColor={(id, color) => popupVM.statusList.updateColor(id, color)}
                  onDelete={() => popupVM.statusList.removeItem(item.id)}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => popupVM.statusList.createItem()} >
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
              {popupVM.statusTypeList.items.map((item: IssueTypeDef) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onChangeName={(id, name) => popupVM.statusTypeList.updateName(id, name)}
                  onChangeColor={(id, color) => popupVM.statusTypeList.updateColor(id, color)}
                  onDelete={() => popupVM.statusTypeList.removeItem(item.id)}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => popupVM.statusTypeList.createItem()} >
                <span>+</span>
                타입 추가
              </button>
            </div>
          </div>

          {/* 우선 순위 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>⭐</span>
              우선순위<span className={styles.required}>*</span>
            </h3>
            <div className={styles.item_wrap}>
              {popupVM.priorityList.items.map((item: PriorityDef) => (
                <TemplateItemRow
                  key={item.id}
                  item={item}
                  onChangeName={(id, name) => popupVM.priorityList.updateName(id, name)}
                  onChangeColor={(id, color) => popupVM.priorityList.updateColor(id, color)}
                  onDelete={() => popupVM.priorityList.removeItem(item.id)}
                />
              ))}

              <button className={styles.add_item_btn} onClick={() => popupVM.priorityList.createItem()} >
                <span>+</span>
                우선순위 추가
              </button>
            </div>
          </div>

          {/* 역할/권한 */}
          <div className={styles.form_section}>
            <h3 className={styles.section_title}>
              <span className={styles.section_icon}>👥</span>
              역할 & 권한<span className={styles.required}>*</span>
            </h3>
            <span className={styles.form_hint}>각 역할에 부여할 권한을 선택하세요</span>
            <div className={styles.permission_matrix}>
              <div className={styles.matrix_header}>
                <div>권한</div>
                {popupVM.projectRoleList.map((role: RoleDef, idx) => (
                  <div key={idx}>{role.name}</div>
                ))}
              </div>

              {permissionLabel.map((p) => (
                <div className={styles.matrix_row} key={p.code}>
                  <div className={styles.permission_name}>{p.label}</div>

                  {popupVM.projectRoleList.map((role: RoleDef) => (
                    <div className={styles.role_checkbox} key={role.code}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={popupVM.hasPermission(p.code, role.code)}
                        onChange={() => popupVM.togglePermission(p.code, role.code)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className={styles.popfoot}>
          <Button text={'취소'} variant='text' onClick={popupVM.close}></Button>
          <Button text={'템플릿 저장'} onClick={popupVM.submit}></Button>
        </div>
      </div>
    </div>
  );
};
