package com.example.TaskFlow.mybatis.handler;

import com.example.TaskFlow.model.response.template.TemplateConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import java.sql.*;

@MappedTypes(TemplateConfig.class)
public class JsonbTypeHandler extends BaseTypeHandler<TemplateConfig> {

    private static final ObjectMapper om = new ObjectMapper();

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, TemplateConfig parameter, JdbcType jdbcType)
            throws SQLException {
        try {
            String json = om.writeValueAsString(parameter);
            ps.setObject(i, json, Types.OTHER); // jsonb
        } catch (Exception e) {
            throw new SQLException("TemplateConfig -> json serialize failed", e);
        }
    }

    @Override public TemplateConfig getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return read(rs.getString(columnName));
    }
    @Override public TemplateConfig getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return read(rs.getString(columnIndex));
    }
    @Override public TemplateConfig getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return read(cs.getString(columnIndex));
    }

    private TemplateConfig read(String json) throws SQLException {
        if (json == null || json.isBlank()) return null;
        try {
            return om.readValue(json, TemplateConfig.class);
        } catch (Exception e) {
            throw new SQLException("json -> TemplateConfig deserialize failed", e);
        }
    }
}
