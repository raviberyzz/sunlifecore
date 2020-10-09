class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    let contextHubData = localStorage.getItem("ContextHubPersistence");
    let defaultBGValue = "";
    if (contextHubData) {
      let userProfile = JSON.parse(localStorage.getItem("ContextHubPersistence"));
      defaultBGValue = userProfile.store.profile.businessGroup;
    }
    
    this.state = {
      defaultBG:defaultBGValue,
      pageLang: utag_data.page_language,
      businessGroupList: {
        tags: []
      },
      topicsList: {
        tags: []
      },
      tabHeading: [],
      allChecked: false,
      selectedPreferenceList: [],
      newsList: [
        {
          "publishedDate": 1584037800000,
          "heading": "How to raise a Healthy family",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1584037800000,
          "heading": "Insights from the DHS - A Customer Journey",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/business_group/es", "sunlife:source/business_group/corporate", "sunlife:source/business_group/us", "sunlife:source/business_group/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "Inclusive work spaces",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "Dean's Message",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "5 ways to avoid burnout",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "How to talk to your boss about your mental health",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "What you need to know before you see a therapist",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/business_group/corporate", "sunlife:source/business_group/es", "sunlife:source/business_group/slc", "sunlife:source/business_group/us", "sunlife:source/topics/diversity-&-inclusion"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 1",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/about-us_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/business_group/uk", "sunlife:source/topics/innovation"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 2",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/awards-recognition_220x220.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/business_group/philippines", "sunlife:source/topics/general-HR", "sunlife:source/topics/my-learning"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 3",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/business_group/canada", "sunlife:source/business_group/corporate", "sunlife:source/topics/my-benefits-and-wellness", "sunlife:source/topics/company-performance", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        }, {
          "publishedDate": 1577817000000,
          "heading": "News article 4",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "tags": ["sunlife:source/business_group/canada", "sunlife:source/business_group/enterprise-services", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 5",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/istock-84413525-awards-and-recognition-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/business_group/hong-kong", "sunlife:source/topics/digital-enterprise", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 6",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/business_group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 7",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Investors/M19-016-InvestorDay_220x220.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/my-benefits-and-wellness"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 8",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/topics/philanthropy-sponsorship"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 9",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/business_group/corporate", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 10",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 11",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/business_group/es", "sunlife:source/business_group/corporate", "sunlife:source/business_group/us", "sunlife:source/business_group/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 12",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 13",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 14",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 15",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 16",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/business_group/es", "sunlife:source/business_group/slc", "sunlife:source/business_group/us", "sunlife:source/topics/diversity-&-inclusion"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 17",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 18",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 19",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/corporate", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 20",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 21",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/my-career"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 22",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 23",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 24",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 25",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/my-career"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 26",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/enterprise-services", "sunlife:source/topics/my-benefits-and-wellness"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 27",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 28",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 29",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 30",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 31",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 32",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 33",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 34",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business_group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 35",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 36",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 37",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 38",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 39",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 40",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 41",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 42",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business_group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 43",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 44",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 45",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 46",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 47",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 48",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 49",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 50",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business_group/international", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 51",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 52",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 53",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 54",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 55",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 56",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 57",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 58",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business_group/philippines", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 59",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 60",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 61",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 62",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 63",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 64",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 65",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 66",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 67",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 68",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 69",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 70",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 71",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 72",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 73",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 74",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 75",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 76",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business_group/asia", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 77",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 78",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 79",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 80",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/philanthropy-sponsorship"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 81",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 82",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business_group/us", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 83",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 84",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 85",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 86",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 87",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 88",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 89",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 90",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business_group/uk", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 91",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 92",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 93",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 94",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 95",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 96",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 97",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 98",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business_group/vietnam", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and"
        }
      ],
      filterNewsList: [],
      selectedPreferenceTags: []
    };

    this.getTabsHeading = this.getTabsHeading.bind(this);
    this.newsTiles = this.newsTiles.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.filteringNewsTabList = this.filteringNewsTabList.bind(this);
    this.paginationDataBuild = this.paginationDataBuild.bind(this);
    this.tagSorting = this.tagSorting.bind(this);
    this.getTabsNewsList = this.getTabsNewsList.bind(this);
    this.getPreferenceList = this.getPreferenceList.bind(this);
    this.addSelectedPreference = this.addSelectedPreference.bind(this);
    this.retrieveSelectedPreference = this.retrieveSelectedPreference.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
    this.getTabsHeading();
    this.tagSorting();
  }

  handleAllChecked(event) {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.state.topicsList.tags.forEach(prefer => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  filteringNewsTabList() {
    this.state.selectedPreferenceList = [];
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
      }
    })
    this.state.topicsList.tags.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
      }
    })
    this.state.filterNewsList = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.filterNewsList = this.state.newsList.filter((news) => {
        return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
      });
    } else {
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function (a, b) {
      return (b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading));
    });
    this.getTabsHeading();
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList
    });
    this.addSelectedPreference();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
    window.location.reload();
  }

  clearAll() {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = false;
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = false)
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
    this.filteringNewsTabList();
    this.getTabsHeading();
  }

  dateTransform(date) {
    let monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    let y = d1.getFullYear();
    return `${monthName[m]} ${d}, ${y}`;
    // return moment(date).format('MMMM DD, YYYY');
  }

  bgBinding(bgList) {
    let bg = "";
    bgList.forEach((data) => {
      let bgarr = data.split('/');
      if (bgarr[1] == "business_group") {
        bg += " | " + bgarr[bgarr.length - 1];
      }
    })
    return bg;
  }

  getTabsHeading() {
    let curyear = new Date().getFullYear();
    let i = 3;
    let yearList = [];
    while (i > 0) {
      const yearVal = curyear--;
      const yearObj = {
        year: yearVal,
        data: [],
        pageData: []
      };
      this.state.filterNewsList.forEach((news) => {
        if (new Date(news.publishedDate).getFullYear() === yearVal) {
          yearObj.data.push(news);
        }
      });
      yearObj.pageData = this.paginationDataBuild(yearObj.data, 1);
      yearList.push(yearObj);
      i--;
    }
    this.setState({
      tabHeading: yearList
    })
  }

  paginationDataBuild(newsList, page) {
    const pageObj = {
      totalPage: Math.ceil(newsList.length / 10),
      currentPage: page,
      startIndex: (page - 1) * 10,
      endIndex: (page - 1) * 10 + 10,
      startPage: 1,
      endPage: 1,
      pages: []
    };
    pageObj.startPage = Math.max(page - 2, 2);
    pageObj.endPage = page + 2;
    if (page < 3) {
      pageObj.endPage = Math.min(5, pageObj.totalPage - 1);
    } else if (pageObj.totalPage - page < 3) {
      pageObj.startPage = Math.max(pageObj.totalPage - 4, 2);
      pageObj.endPage = pageObj.totalPage - 1;
    }
    for (let p = pageObj.startPage; p <= pageObj.endPage; p++) {
      pageObj.pages.push(p);
    }
    return pageObj;
  }

  setPage(selectedData, page) {
    this.state.tabHeading.forEach(yearData => {
      if (yearData.year == selectedData.year) {
        yearData.pageData = this.paginationDataBuild(yearData.data, page);
      }
    })
    this.setState({
      tabHeading: this.state.tabHeading
    })
  }

  tagSorting() {
    let businessTag = [];
    let topicsTag = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.selectedPreferenceList.forEach((element) => {
        if (element.split("/")[1] == "business_group" && element != "sunlife:source/business_group/canada") {
          businessTag.push(element);
        } else if (element.split("/")[1] == "topics") {
          topicsTag.push(element);
        }
      });
      businessTag.forEach((element, index) => {
        businessTag[index] = element.split("/")[2];
      });
      topicsTag.forEach((element, index) => {
        topicsTag[index] = element.split("/")[2];
      });
      businessTag.sort();
      topicsTag.sort();
      this.state.selectedPreferenceTags = businessTag.concat(topicsTag);
    }
    this.setState({
      selectedPreferenceTags: this.state.selectedPreferenceTags
    });
  }
  getTabsNewsList() {
    $.ajax({
      type: "GET",
      url: `/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.news.${this.state.pageLang}.json`,
      dataType: "json",
      success: (res) => {
        this.state.newsList = res;
        this.state.filterNewsList = [];
        if (this.state.selectedPreferenceList.length > 0) {
          this.state.filterNewsList = this.state.newsList.filter((news) => {
            return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
          });
        } else {
          this.state.filterNewsList = this.state.newsList;
        }
        this.state.filterNewsList.sort(function (a, b) {
          return (b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading));
        });
        this.setState({
          newsList: this.state.newsList,
          filterNewsList: this.state.filterNewsList,
        })
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getPreferenceList() {
    $.ajax({
      type: "GET",
      url: `/content/cq:tags/sunlife/source.tags.${this.state.pageLang}.json`,
      dataType: "json",
      success: (res) => {
        this.state.businessGroupList = res.business_group;
        this.state.topicsList = res.topics;
        this.state.businessGroupList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach(prefer => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          })
        });
        this.state.topicsList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach(prefer => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          })
        });
        this.setState({
          businessGroupList: this.state.businessGroupList,
          topicsList: this.state.topicsList,
        })
        this.getTabsNewsList();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addSelectedPreference() {
    let reqData = {
      "articlefilter": this.state.selectedPreferenceList
    };
    $.ajax({
      type: "POST",
      url: "/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.ugc.addPreference.json",
      contentType: 'application/json',
      data: JSON.stringify(reqData),
      dataType: "json",
      success: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  retrieveSelectedPreference() {
    $.ajax({
      type: "GET",
      url: "/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.ugc.retrievePreference.json",
      dataType: "json",
      success: (res) => {
        this.state.selectedPreferenceList = res;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        })
        this.getPreferenceList();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  newsTiles() {
    this.retrieveSelectedPreference();
    // this.state.businessGroupList = {
    //   id: "sunlife:source/business_group",
    //   title: "Business groups",
    //   tags: [
    //     { title: "Canada", id: "sunlife:source/business_group/canada" },
    //     { title: "Corporate", id: "sunlife:source/business_group/corporate" },
    //     { title: "Enterprise Services", id: "sunlife:source/business_group/enterprise-services" },
    //     { title: "Hong Kong", id: "sunlife:source/business_group/hong-kong" },
    //     { title: "Indonesia", id: "sunlife:source/business_group/indonesia" },
    //     { title: "International", id: "sunlife:source/business_group/international" },
    //     { title: "Philippines", id: "sunlife:source/business_group/philippines" },
    //     { title: "SLC Management", id: "sunlife:source/business_group/slc-management" },
    //     { title: "Asia", id: "sunlife:source/business_group/asia" },
    //     { title: "U.S.", id: "sunlife:source/business_group/us" },
    //     { title: "U.K.", id: "sunlife:source/business_group/uk" },
    //     { title: "Vietnam", id: "sunlife:source/business_group/vietnam" }
    //   ]
    // };
    // this.state.topicsList = {
    //   id: "sunlife:source/topics",
    //   title: "Topics",
    //   tags: [
    //     { title: "Business continuity", id: "sunlife:source/topics/business-continuity" },
    //     { title: "Business critical", id: "sunlife:source/topics/business-critical" },
    //     { title: "Client stories", id: "sunlife:source/topics/client-stories" },
    //     { title: "Company performance", id: "sunlife:source/topics/company-performance" },
    //     { title: "Compliance", id: "sunlife:source/topics/compliance" },
    //     { title: "Corporate Real Estate", id: "sunlife:source/topics/corporate-real-estate" },
    //     { title: "COVID-19", id: "sunlife:source/topics/covid-19" },
    //     { title: "Digital Enterprise", id: "sunlife:source/topics/digital-enterprise" },
    //     { title: "Diversity & Inclusion", id: "sunlife:source/topics/diversity-&-inclusion" },
    //     { title: "Employee engagement", id: "sunlife:source/topics/employee-engagement" },
    //     { title: "General HR", id: "sunlife:source/topics/general-HR" },
    //     { title: "Innovation", id: "sunlife:source/topics/innovation" },
    //     { title: "My Benefits and Wellness", id: "sunlife:source/topics/my-benefits-and-wellness" },
    //     { title: "My Career", id: "sunlife:source/topics/my-career" },
    //     { title: "My Learning", id: "sunlife:source/topics/my-learning" },
    //     { title: "My Pay", id: "sunlife:source/topics/my-pay" },
    //     { title: "Organization announcements", id: "sunlife:source/topics/organization-announcements" },
    //     { title: "Philanthropy/Sponsorship", id: "sunlife:source/topics/philanthropy-sponsorship" },
    //     { title: "Recognition", id: "sunlife:source/topics/recognition" },
    //     { title: "Sustainability", id: "sunlife:source/topics/sustainability" },
    //     { title: "Technology", id: "sunlife:source/topics/technology" }
    //   ]
    // };
    // this.state.businessGroupList.tags.forEach((data) => {
    //   data["isChecked"] = false;
    //   this.state.selectedPreferenceList.forEach(prefer => {
    //     if (prefer === data.id) {
    //       data["isChecked"] = true;
    //     }
    //   })
    // });
    // this.state.topicsList.tags.forEach((data) => {
    //   data["isChecked"] = false;
    //   this.state.selectedPreferenceList.forEach(prefer => {
    //     if (prefer === data.id) {
    //       data["isChecked"] = true;
    //     }
    //   })
    // });
    // this.state.filterNewsList = [];
    // if (this.state.selectedPreferenceList.length > 0) {
    //   this.state.filterNewsList = this.state.newsList.filter((news) => {
    //     return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
    //   });
    // } else {
    //   this.state.filterNewsList = this.state.newsList;
    // }
    // this.state.filterNewsList.sort(function (a, b) {
    //   return (b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading));
    // });
    // this.setState({
    //   filterNewsList: this.state.filterNewsList,
    //   businessGroupList: this.state.businessGroupList,
    //   topicsList: this.state.topicsList,
    // })
  }

  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
            <div class="news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" &&
                <div>
                  <div class="row news-tool-bar">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                      <p class="left-text pull-left">{this.props.toolbarLeftText}</p>
                      <div class="preference-tag-container hidden-sm hidden-xs">
                        {this.state.selectedPreferenceTags.slice(0, 4).map((value, index) => {
                          return (<span class="tag">{value}</span>)
                        })}
                        {this.state.selectedPreferenceTags.length > 4 &&
                          <span class="more-tag">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4}`}</span>
                        }
                      </div>
                      <span class="pull-right">
                        {this.state.selectedPreferenceTags.length > 0 &&
                          <span class="hidden-md hidden-lg">({this.state.selectedPreferenceTags.length})</span>
                        }
                        <a class="right-text" data-target="#preferenceModal" data-toggle="modal" id="preferenceModalLink" href="#preferenceModal">{this.props.toolbarRightText}<span class={`fa ${this.props.iconName}`}></span></a>
                      </span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
                  </div>
                  <div id="preferenceModal" class="modal fade preference-popup-wrapper horizontal-middle-align" role="dialog">
                    <div class="modal-dialog preference-modaldialog">
                      <div class="modal-content horizontal-middle-align">
                        <div class="modal-header preference-modal-header">
                          <button type="button" class="fa fa-remove collapse-x close-modal" aria-label="Close"
                            data-dismiss="modal">
                          </button>
                          <h5 class="heading-text">{this.props.preferenceModalHeading}</h5>
                          <p>
                            <input type="checkbox" id="selectAll" onChange={this.handleAllChecked} name="selectAll" checked={this.state.allChecked} value="selectAll" />
                            <span class="chk-lbl">{this.props.selectAllText}</span>
                          </p>
                        </div>
                        <div class="modal-body preference-modal-body">
                          <div class="row preference-list">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <p class="heading-text">{this.state.businessGroupList.title}</p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.tags.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.id} value={value.id} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.isChecked && value.title === this.state.defaultBG} />
                                      <span class="chk-lbl">{value.title}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">{this.state.topicsList.title}</p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.tags.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.id} value={value.id} onChange={this.handleCheckChildElement} checked={value.isChecked} />
                                      <span class="chk-lbl">{value.title}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer preference-modal-footer">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper primary-blue-button-form">
                              <button class="cmp-form-button pull-right" onClick={this.filteringNewsTabList}>{this.props.preferenceModalHeadingbtn1}</button>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper secondary-button-form">
                              <button class="cmp-form-button sec-btn" onClick={this.clearAll}>{this.props.preferenceModalHeadingbtn2}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {this.props.newsTabsContainer == "true" &&
                <div class="news-tabs-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="we-tabs aem-GridColumn aem-GridColumn--default--12 tabs-wrapper">
                    <div class="cmp-tabs" id="tabs-container">
                      <ol role="tablist" id="tabList" class="cmp-tabs__tablist" aria-multiselectable="false">
                        {Object.keys(this.state.tabHeading).map((value, index) => {
                          return (
                            <li role="presentation" key={index} class="cmp-tabs__tab" tabindex={index} data-cmp-hook-tabs="tab" aria-controls={this.state.tabHeading[value].year} aria-selected="true">{this.state.tabHeading[value].year}
                            </li>
                          )
                        })}
                      </ol>
                      {Object.keys(this.state.tabHeading).map((value, index) => {
                        return (
                          <div role="tabpanel" tabindex={index} class="cmp-tabs__tabpanel" data-cmp-hook-tabs="tabpanel">
                            <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" aria-expanded="false" tabindex={index}>{this.state.tabHeading[value].year}</div>
                            <div class="responsivegrid">
                              <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                {Object.keys(this.state.tabHeading[value].data).slice(this.state.tabHeading[value].pageData.startIndex, this.state.tabHeading[value].pageData.endIndex).map((key, index) => {
                                  return (
                                    <div class="news-list-box">
                                      <p>{this.dateTransform(this.state.tabHeading[value].data[key].publishedDate) + this.bgBinding(this.state.tabHeading[value].data[key].tags)}</p>
                                      <p>
                                        <a href={this.state.tabHeading[value].data[key].pagePath}>{this.state.tabHeading[value].data[key].heading}</a>
                                      </p>
                                      <p>{this.state.tabHeading[value].data[key].summary}</p>
                                    </div>
                                  )
                                })}
                                {this.state.tabHeading[value].pageData.totalPage > 1 &&
                                  <div class="pagination-component">
                                    <nav role="navigation" aria-label="Pagination" class="text-center">
                                      <ul className={`pagination pagination-list ${this.state.tabHeading[value].pageData.currentPage < 2 ? 'first-page' : ''} ${this.state.tabHeading[value].pageData.currentPage >= this.state.tabHeading[value].pageData.totalPage ? 'last-page' : ''}`}>
                                        {this.state.tabHeading[value].pageData.currentPage != 1 &&
                                          <li className={`previous ${this.state.tabHeading[value].pageData.currentPage < 2 ? 'disabled' : ''}`}>
                                            <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage - 1)}>
                                              <span class="fa fa-angle-left" aria-hidden="true"></span>
                                              <span>{this.props.previousText}</span>
                                            </a>
                                          </li>
                                        }
                                        <li className={`link-to-first ${this.state.tabHeading[value].pageData.currentPage == 1 ? 'active' : ''}`}>
                                          <a href="javascript:void(0)" aria-label="First Page" onClick={() => this.setPage(this.state.tabHeading[value], 1)}>
                                            <span class="fa fa-angle-double-left" aria-hidden="true"></span>
                                            <span>1</span>
                                          </a>
                                        </li>
                                        {this.state.tabHeading[value].pageData.currentPage >= 5 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                          <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                        }
                                        {this.state.tabHeading[value].pageData.pages.map((page, index) => {
                                          return (<li key={index} className={(this.state.tabHeading[value].pageData.currentPage == page ? 'active' : '')}><a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], page)}><span>{page}</span></a></li>)
                                        })
                                        }
                                        {(this.state.tabHeading[value].pageData.totalPage - this.state.tabHeading[value].pageData.currentPage) >= 4 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                          <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                        }
                                        <li class="lastPage">
                                          <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.totalPage)}>
                                            <span>{this.state.tabHeading[value].pageData.totalPage}</span>
                                          </a>
                                        </li>
                                        {this.state.tabHeading[value].pageData.currentPage != this.state.tabHeading[value].pageData.totalPage &&
                                          <li className={`next ${this.state.tabHeading[value].pageData.currentPage >= this.state.tabHeading[value].pageData.totalPage ? 'disabled' : ''}`}>
                                            <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage + 1)}>{this.props.nextText}</a>
                                          </li>
                                        }
                                      </ul>
                                      <div class="pagination-indicator">
                                        {`${this.props.pageText} ${this.state.tabHeading[value].pageData.currentPage} ${this.props.ofText} ${this.state.tabHeading[value].pageData.totalPage}`}
                                      </div>
                                    </nav>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}
reactComponents["news-tabs"] = NewsTabs;
