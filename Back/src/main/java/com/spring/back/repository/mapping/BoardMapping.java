package com.spring.back.repository.mapping;

import java.util.List;

public interface BoardMapping {
	
	// Element
	// --------------------------------------------------------------------------------------------------------------------------------
	// [BoardNo]
	Long getboardNo();
	
	// [UserId]
	List<UserId> getUser();

	// [FileName]
	List<FileName> getFiles();
	
	// Interface
	// --------------------------------------------------------------------------------------------------------------------------------
	interface FileName {
		String getFileName();
	}
	
	interface UserId {
		String getUserId();
	}
}
