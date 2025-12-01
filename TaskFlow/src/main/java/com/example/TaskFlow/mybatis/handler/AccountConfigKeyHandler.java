package com.example.TaskFlow.mybatis.handler;

import com.example.TaskFlow.common.enums.AccountConfigKey;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedTypes(AccountConfigKey.class)
public class AccountConfigKeyHandler extends BaseTypeHandler<AccountConfigKey> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, AccountConfigKey status, JdbcType jdbcType) throws SQLException {
        ps.setString(i, status.getCode());
    }

    @Override
    public AccountConfigKey getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String code = rs.getString(columnName);
        return AccountConfigKey.fromValue(code);
    }

    @Override
    public AccountConfigKey getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String code = rs.getString(columnIndex);
        return AccountConfigKey.fromValue(code);
    }

    @Override
    public AccountConfigKey getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String code = cs.getString(columnIndex);
        return AccountConfigKey.fromValue(code);
    }
}
