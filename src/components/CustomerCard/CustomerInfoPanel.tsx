import React, { useState } from 'react';
import './CustomerCard.css';
import type { CustomerInfo } from './types';
import { Input, Select, Button } from '../form';

export interface CustomerInfoPanelProps {
  /** 고객명 */
  name: string;
  /** 고객 ID */
  customerId: string;
  /** 고객 상세 정보 */
  customerInfo?: CustomerInfo;
  /** 신규 고객 여부 (입력 폼 표시) */
  isNewCustomer?: boolean;
  /** 편집 가능 여부 */
  editable?: boolean;
  /** 저장 콜백 */
  onSave?: (updatedInfo: CustomerInfo) => void;
  /** 초기화 콜백 */
  onReset?: () => void;
  /** 정보 추가 콜백 */
  onAddField?: () => void;
}

/**
 * NEXUS CustomerInfoPanel 컴포넌트
 *
 * 고객 상세 정보를 표시하고 편집할 수 있는 패널 컴포넌트입니다.
 * 더블클릭으로 편집 모드로 전환할 수 있습니다.
 */
export const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({
  name,
  customerId,
  customerInfo,
  isNewCustomer = false,
  editable = true,
  onSave,
  onReset,
  onAddField,
}) => {
  const [isEditing, setIsEditing] = useState(isNewCustomer);
  const [editedInfo, setEditedInfo] = useState<CustomerInfo>(customerInfo || {});
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const handleDoubleClick = () => {
    if (editable && !isNewCustomer) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setEditedInfo({
      ...editedInfo,
      [field]: value,
    });
  };

  const handleSave = () => {
    onSave?.(editedInfo);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditedInfo(customerInfo || {});
    onReset?.();
    if (!isNewCustomer) {
      setIsEditing(false);
    }
  };

  const handleAddField = () => {
    setShowAdditionalField(true);
    onAddField?.();
  };

  return (
    <div className="customer_info" onDoubleClick={handleDoubleClick}>
      <ul>
        {isNewCustomer || isEditing ? (
          <>
            {/* 편집 모드 */}
            <li className="info_line">
              <div className="info_label">고객명</div>
              <div className="info_value">
                <Input
                  type="text"
                  placeholder="이름 입력"
                  value={isNewCustomer ? '' : name}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  fullWidth
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">고객 ID</div>
              <div className="info_value">{customerId}</div>
            </li>
            <li className="info_line">
              <div className="info_label">전화번호</div>
              <div className="info_value">
                <Input
                  type="tel"
                  placeholder="전화번호 입력"
                  value={editedInfo.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  fullWidth
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">휴대폰</div>
              <div className="info_value">
                <Input
                  type="tel"
                  placeholder="휴대폰 입력"
                  value={editedInfo.mobile || ''}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  fullWidth
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">이메일</div>
              <div className="info_value">
                <Input
                  type="email"
                  placeholder="이메일 입력"
                  value={editedInfo.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  fullWidth
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">주소</div>
              <div className="info_value info_value--address">
                <Button text="우편번호" type="default" />
                <Input
                  type="text"
                  placeholder="주소 입력"
                  value={editedInfo.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  fullWidth
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">마케팅 동의</div>
              <div className="info_value">
                <Select
                  options={[
                    { value: 'Y', label: 'Y' },
                    { value: 'N', label: 'N' },
                  ]}
                  value={editedInfo.marketingConsent || 'N'}
                  onChange={(value) =>
                    handleInputChange('marketingConsent', value as 'Y' | 'N')
                  }
                />
              </div>
            </li>
            <li className="info_line">
              <div className="info_label">VIP여부</div>
              <div className="info_value">
                <Select
                  options={[
                    { value: 'Y', label: 'Y' },
                    { value: 'N', label: 'N' },
                  ]}
                  value={editedInfo.vipStatus || 'N'}
                  onChange={(value) =>
                    handleInputChange('vipStatus', value as 'Y' | 'N')
                  }
                />
              </div>
            </li>
            {!isNewCustomer && (
              <>
                <li className="info_line">
                  <div className="info_label">추천인</div>
                  <div className="info_value">
                    <Input
                      type="text"
                      placeholder="추천인 입력"
                      value={editedInfo.referrer || ''}
                      onChange={(e) => handleInputChange('referrer', e.target.value)}
                      fullWidth
                    />
                  </div>
                </li>
                <li className="info_line">
                  <div className="info_label">예약일시</div>
                  <div className="info_value">
                    <Input
                      type="text"
                      placeholder="예약일시 입력"
                      value={editedInfo.reservationDate || ''}
                      onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                      fullWidth
                    />
                  </div>
                </li>
                <li className="info_line">
                  <div className="info_label">재방문의사</div>
                  <div className="info_value">
                    <Select
                      options={[
                        { value: 'Y', label: 'Y' },
                        { value: 'N', label: 'N' },
                      ]}
                      value={editedInfo.revisitIntent || 'N'}
                      onChange={(value) =>
                        handleInputChange('revisitIntent', value as 'Y' | 'N')
                      }
                    />
                  </div>
                </li>
              </>
            )}
            {showAdditionalField && (
              <li className="info_line plus_info">
                <div className="info_label">
                  <Select
                    options={[
                      { value: '', label: '선택' },
                      { value: 'field1', label: '항목1' },
                      { value: 'field2', label: '항목2' },
                    ]}
                    placeholder="선택"
                  />
                </div>
                <div className="info_value">
                  <Input type="text" fullWidth />
                </div>
              </li>
            )}
            {/* 편집 모드 버튼 */}
            {!isNewCustomer && (
              <li className="btn_plus_wrap button-wrap">
                <Button text="초기화" type="default" onClick={handleReset} />
                <Button text="저장" type="default" onClick={handleSave} />
                <Button text="정보추가" type="default" onClick={handleAddField} />
              </li>
            )}
          </>
        ) : (
          <>
            {/* 읽기 모드 */}
            <li className="info_line">
              <div className="info_label">고객명</div>
              <div className="info_value">{name}</div>
            </li>
            <li className="info_line">
              <div className="info_label">고객 ID</div>
              <div className="info_value">{customerId}</div>
            </li>
            {customerInfo?.phone && (
              <li className="info_line">
                <div className="info_label">전화번호</div>
                <div className="info_value">
                  {customerInfo.phone}
                </div>
              </li>
            )}
            {customerInfo?.mobile && (
              <li className="info_line">
                <div className="info_label">휴대폰</div>
                <div className="info_value">
                  {customerInfo.mobile}
                </div>
              </li>
            )}
            {customerInfo?.email && (
              <li className="info_line">
                <div className="info_label">이메일</div>
                <div className="info_value">{customerInfo.email}</div>
              </li>
            )}
            {customerInfo?.address && (
              <li className="info_line">
                <div className="info_label">주소</div>
                <div className="info_value">{customerInfo.address}</div>
              </li>
            )}
            {customerInfo?.marketingConsent && (
              <li className="info_line">
                <div className="info_label">마케팅 동의</div>
                <div className="info_value">{customerInfo.marketingConsent}</div>
              </li>
            )}
            {customerInfo?.vipStatus && (
              <li className="info_line">
                <div className="info_label">VIP여부</div>
                <div className="info_value">{customerInfo.vipStatus}</div>
              </li>
            )}
            {customerInfo?.referrer && (
              <li className="info_line">
                <div className="info_label">추천인</div>
                <div className="info_value">{customerInfo.referrer}</div>
              </li>
            )}
            {customerInfo?.reservationDate && (
              <li className="info_line">
                <div className="info_label">예약일시</div>
                <div className="info_value">{customerInfo.reservationDate}</div>
              </li>
            )}
            {customerInfo?.revisitIntent && (
              <li className="info_line">
                <div className="info_label">재방문의사</div>
                <div className="info_value">{customerInfo.revisitIntent}</div>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
