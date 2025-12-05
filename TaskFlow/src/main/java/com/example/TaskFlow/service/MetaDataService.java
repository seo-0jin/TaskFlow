package com.example.TaskFlow.service;

import com.example.TaskFlow.dao.MetaDataDao;
import com.example.TaskFlow.model.response.PositionResponse;
import com.example.TaskFlow.model.response.RoleResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetaDataService {
    private final MetaDataDao metaDataDao;

    public MetaDataService(MetaDataDao metaDataDao) {
        this.metaDataDao = metaDataDao;
    }

    public List<PositionResponse>  getPositionList() {
        return metaDataDao.findAllPositions();
    }

    public List<RoleResponse> getRolesList() {
        return metaDataDao.findAllRoles();
    }
}
