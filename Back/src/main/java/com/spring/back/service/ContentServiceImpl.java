package com.spring.back.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.content.ContentCategory;
import com.spring.back.dto.ContentDTO;
import com.spring.back.entity.Content;
import com.spring.back.repository.ContentRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	ContentRepository contentRepo;


	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 작성]
	@Override
	public ContentDTO insertContent(ContentDTO contentDTO) {
		Content content = ContentDTO.contentDtoToEntity(contentDTO);

		Long contentNo = contentRepo.save(content).getContentNo();

		Content newContent = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);
		ContentDTO newContentDTO = Content.contentEntityToDTO(newContent);
		return newContentDTO;
	}

	// Read Category
	// --------------------------------------------------------------------------------------------------------------------------------
	// [카테고리 가져오기]
	@Override
	public List<ContentDTO> getByCategory(ContentDTO contentDTO) throws NullPointerException{
		ContentCategory contentCategory = contentDTO.getContentCategory();

//		List<Content> contents = contentRepo.findTop10ByContentCategoryAndSendDateIsNullOrderByContentNoDesc(contentCategory);
		List<Content> contents = contentRepo.findTop10ByContentCategoryAndDateAndSendDateIsNullOrderByContentNoDesc(contentCategory,LocalDate.now());

		List<ContentDTO> contentDTOs = contents.stream().map(content -> Content.contentEntityToDTO(content)).collect(Collectors.toList());
		return contentDTOs;

	}
	// [보낸 메일 확인(카테고리 별로)]
	@Override
	public List<ContentDTO> getBySendMail(ContentDTO contentDTO) {
		ContentCategory contentCategory = contentDTO.getContentCategory();
		
		List<Content> contents = contentRepo.findByContentCategoryAndSendDateIsNotNullOrderBySendDateDesc(contentCategory);
		
		List<ContentDTO> contentDTOs = contents.stream().map(content -> Content.contentEntityToDTO(content)).collect(Collectors.toList());
		return contentDTOs;
		
	}
	
	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 가져오기]
	@Override
	public ContentDTO getContent(ContentDTO contentDTO) {
		
		Long contentNo = contentDTO.getContentNo();
		
		Content content = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);
		
		ContentDTO ContentDTO = Content.contentEntityToDTO(content);
		return ContentDTO;
		
	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 수정]
	@Override
	public boolean updateContent(ContentDTO contentDTO) {
		Content content = ContentDTO.contentDtoToEntity(contentDTO);

		
		contentRepo.save(content);
		return true;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [특정 컨텐츠 삭제]
	public boolean deleteContent(ContentDTO contentDTO) {
		Long contentNo = contentDTO.getContentNo();

		Content content = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);

		
		contentRepo.deleteById(content.getContentNo());
		return true;
	
	}
	

}
