package ca.sunlife.web.cms.core.models;

import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


/**
 * The Interface ArticleModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleModel {

	
	/**
	 * Gets the category.
	 *
	 * @return the category
	 */
	@Inject
	private String category;
	
	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	@Inject
	private String title;
	
	/**
	 * Gets the date.
	 *
	 * @return the date
	 */
	@Inject
	private String date;
	
	/**
	 * Gets the author.
	 *
	 * @return the author
	 */
	@Inject
	private String author;
	
	/**
	 * Gets the headline.
	 *
	 * @return the headline
	 */
	@Inject
	private String headline;
	
	/**
	 * Gets the file reference.
	 *
	 * @return the file reference
	 */
	@Inject
	private String fileReference;
	
	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	@Inject
	private String description;
	
	/**
	 * Gets the jcr last modified.
	 *
	 * @return the jcr last modified
	 */
	@Inject
	@Named("jcr:lastModified")
	private String jcrLastModified;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return 	getFormatedDate(date);
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getHeadline() {
		return headline;
	}

	public void setHeadline(String headline) {
		this.headline = headline;
	}

	public String getFileReference() {
		return fileReference;
	}

	public void setFileReference(String fileReference) {
		this.fileReference = fileReference;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJcrLastModified() {
		return getFormatedDate(jcrLastModified);
	}

	public void setJcrLastModified(String jcrLastModified) {
		this.jcrLastModified = jcrLastModified;
	}
	
	/**
	 * Gets the formated date.
	 *
	 * @param dateParam the date param
	 * @return the formated date
	 */
	public String getFormatedDate(String dateParam) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-DD");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MMMM DD YYYY");
		try {
			Date newdate = formatter.parse(dateParam);
			dateParam= newFormatter.format(newdate);
		}catch (ParseException e) {
			e.printStackTrace();
		}
		return dateParam;
	}
	
}
