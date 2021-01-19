package ca.sunlife.web.cms.core.models;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Repository;
import javax.jcr.RepositoryException;
import javax.jcr.SimpleCredentials;

import org.apache.jackrabbit.commons.JcrUtils;

public class PropertyReader {

	public static void main(String[] args) {
		System.out.println("");
		// Create a connection to the CQ repository running on local host
		Repository repository;
		try {
			repository = JcrUtils.getRepository("http://localhost:4503/crx/server");

			// Create a Session
			javax.jcr.Session session = repository.login(new SimpleCredentials("admin", "admin".toCharArray()));

			// Create a node that represents the root node
			Node root = session.getRootNode();
			
			Node node = root.getNode("/content/sunlife/internal/source/en/our-company/who-we-are");
			
			if( null != node ) {
				System.out.println("Node : {}" + node.getPath());
				NodeIterator nodeIterator = node.getNodes();
				while (nodeIterator.hasNext()) {
					Node childNode = nodeIterator.nextNode();
					System.out.println("child node: "+childNode.getName());
				}
				
			}

		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}
}
