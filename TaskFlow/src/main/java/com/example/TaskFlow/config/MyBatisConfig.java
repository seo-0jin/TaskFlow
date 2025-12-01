package com.example.TaskFlow.config;

import com.example.TaskFlow.mybatis.handler.AccountConfigKeyHandler;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.transaction.managed.ManagedTransactionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.stream.Stream;

@Configuration
public class MyBatisConfig {
    private final ApplicationContext applicationContext;

    public MyBatisConfig(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Bean(name = "SqlSessionFactory")
    @Primary
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);

        // 수동 등록
        // @formatter:off
        sqlSessionFactoryBean.setTypeHandlers(
                new AccountConfigKeyHandler());
        // @formatter:on

        sqlSessionFactoryBean.setMapperLocations(
                applicationContext.getResources("classpath:rds-resources/mapper/*.xml")
        );
        sqlSessionFactoryBean.setConfigLocation(new ClassPathResource("/rds-resources/mybatis-config.xml"));
        sqlSessionFactoryBean.setTransactionFactory(new ManagedTransactionFactory());
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "SqlSessionTemplate")
    @Primary
    public SqlSessionTemplate sqlSessionTemplate(
            @Qualifier("SqlSessionFactory")
            SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
