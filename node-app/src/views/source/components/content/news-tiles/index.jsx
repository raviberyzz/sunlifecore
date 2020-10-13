class NewsTiles extends React.Component {
  constructor(props) {
    super(props);
    let contextHubData = localStorage.getItem("ContextHubPersistence");
    let defaultBGValue = "";
    if (contextHubData) {
      let userProfile = JSON.parse(
        localStorage.getItem("ContextHubPersistence")
      );
      defaultBGValue = userProfile.store.profile.businessGroup;
    }
    this.state = {
      defaultBG: defaultBGValue,
      pageLang: utag_data.page_language,
      businessGroupList: {
        tags: [],
      },
      topicsList: {
        tags: [],
      },
      allChecked: false,
      selectedPreferenceList: [],
      businessGroupIdTitle: [],
      newsList: [],
      /*newsList: [
        {
          "publishedDate": 1584037800000,
          "heading": "How to raise a Healthy family",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1584037800000,
          "heading": "Insights from the DHS - A Customer Journey Insights from the DHS - A Customer Journey",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/business-group/es", "sunlife:source/business-group/corporate", "sunlife:source/business-group/us", "sunlife:source/business-group/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "Inclusive work spaces",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "Dean's Message",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "pinArticle": "1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "5 ways to avoid burnout",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "pinArticle": "1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "How to talk to your boss about your mental health",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "What you need to know before you see a therapist",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/business-group/corporate", "sunlife:source/business-group/es", "sunlife:source/business-group/slc", "sunlife:source/business-group/us", "sunlife:source/topics/diversity-&-inclusion"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 1",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/about-us_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/business-group/uk", "sunlife:source/topics/innovation"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 2",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/awards-recognition_220x220.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/business-group/philippines", "sunlife:source/topics/general-HR", "sunlife:source/topics/my-learning"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 3",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/business-group/canada", "sunlife:source/business-group/corporate", "sunlife:source/topics/my-benefits-and-wellness", "sunlife:source/topics/company-performance", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        }, {
          "publishedDate": 1577817000000,
          "heading": "News article 4",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "tags": ["sunlife:source/business-group/canada", "sunlife:source/business-group/enterprise-services", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 5",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/istock-84413525-awards-and-recognition-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/business-group/hong-kong", "sunlife:source/topics/digital-enterprise", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 6",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/business-group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 7",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Investors/M19-016-InvestorDay_220x220.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/my-benefits-and-wellness"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 8",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/topics/philanthropy-sponsorship"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 9",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/business-group/corporate", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 10",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 11",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/business-group/es", "sunlife:source/business-group/corporate", "sunlife:source/business-group/us", "sunlife:source/business-group/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 12",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 13",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 14",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 15",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 16",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/business-group/es", "sunlife:source/business-group/slc", "sunlife:source/business-group/us", "sunlife:source/topics/diversity-&-inclusion"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 17",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 18",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 19",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/corporate", "sunlife:source/topics/general-HR"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 20",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 21",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/my-career"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 22",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 23",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 24",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 25",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/my-career"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 26",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/enterprise-services", "sunlife:source/topics/my-benefits-and-wellness"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 27",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 28",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 29",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 30",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 31",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 32",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 33",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 34",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "tags": ["sunlife:source/business-group/hong-kong", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 35",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 36",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 37",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 38",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 39",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 40",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 41",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 42",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "tags": ["sunlife:source/business-group/indonesia", "sunlife:source/topics/digital-enterprise"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 43",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 44",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 45",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 46",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 47",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 48",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 49",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1514917800000,
          "heading": "News article 50",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "tags": ["sunlife:source/business-group/international", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 51",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 52",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 53",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 54",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 55",
          "pinArticle": "2",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 56",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 57",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 58",
          "pagePath": "/content/sunlife/internal/source/en/news/article2",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "tags": ["sunlife:source/business-group/philippines", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 59",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 60",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1577817000000,
          "heading": "News article 61",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 62",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 63",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 64",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 65",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 66",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 67",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 68",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/slc-management", "sunlife:source/topics/sustainability"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 69",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 70",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 71",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/business-critical"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583778600000,
          "heading": "News article 72",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 73",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 74",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 75",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 76",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "tags": ["sunlife:source/business-group/asia", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 77",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 78",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1546281000000,
          "heading": "News article 79",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 80",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/philanthropy-sponsorship"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 81",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 82",
          "pagePath": "/content/sunlife/internal/source/en/news/article3",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "tags": ["sunlife:source/business-group/us", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 83",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 84",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 85",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 86",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/company-performance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 87",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 88",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 89",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/employee-engagement"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 90",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "tags": ["sunlife:source/business-group/uk", "sunlife:source/topics/organization-announcements"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 91",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/client-stories"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 92",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 93",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/corporate-real-estate"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 94",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/compliance"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 95",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 96",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 97",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/business-continuity"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "publishedDate": 1583346600000,
          "heading": "News article 98",
          "pagePath": "/content/sunlife/internal/source/en/news/article1",
          "thumbnailImage": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "tags": ["sunlife:source/business-group/vietnam", "sunlife:source/topics/covid-19"],
          "summary": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        }
      ], */
      filterNewsList: [],
      selectedPreferenceTags: [],
    };

    this.getNewsTilesData = this.getNewsTilesData.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.filteringNewsList = this.filteringNewsList.bind(this);
    this.tagSorting = this.tagSorting.bind(this);
    this.getNewsList = this.getNewsList.bind(this);
    this.getPreferenceList = this.getPreferenceList.bind(this);
    this.addSelectedPreference = this.addSelectedPreference.bind(this);
    this.retrieveSelectedPreference = this.retrieveSelectedPreference.bind(
      this
    );
    this.mergeArray = this.mergeArray.bind(this);
    this.newsTileClick = this.newsTileClick.bind(this);
  }

  componentDidMount() {
    this.getNewsTilesData();
    this.tagSorting();
  }

  handleAllChecked(event) {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = event.target.checked;
      }
    });
    this.state.topicsList.tags.forEach(
      (prefer) => (prefer.isChecked = event.target.checked)
    );
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
    });
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked;
    });
    this.state.topicsList.tags.forEach((prefer) => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked;
    });
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
    });
  }

  filteringNewsList() {
    this.state.selectedPreferenceList = [];
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
      }
    });
    this.state.topicsList.tags.forEach((prefer) => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
      }
    });
    let pinnedNewsList = [];
    let preferedNewsList = [];
    if (this.state.selectedPreferenceList.length > 0) {
      preferedNewsList = this.state.newsList.filter((news) => {
        return (
          !news.pinArticle &&
          news.tags &&
          news.tags.some(
            (val) => this.state.selectedPreferenceList.indexOf(val) > -1
          )
        );
      });
      pinnedNewsList = this.state.newsList.filter((news) => {
        return (
          news.pinArticle &&
          news.tags &&
          news.tags.some(
            (val) => this.state.selectedPreferenceList.indexOf(val) > -1
          )
        );
      });
    } else {
      preferedNewsList = this.state.newsList;
    }
    pinnedNewsList.sort(function (a, b) {
      return (
        a.pinArticle - b.pinArticle ||
        b.publishedDate - a.publishedDate ||
        a.heading.localeCompare(b.heading)
      );
    });
    preferedNewsList.sort(function (a, b) {
      return (
        b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading)
      );
    });
    if (pinnedNewsList.length > 0) {
      this.state.filterNewsList = this.mergeArray(
        preferedNewsList,
        pinnedNewsList,
        pinnedNewsList[0].pinArticle - 1
      );
    }
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList,
    });
    this.addSelectedPreference();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
    //window.location.reload();
  }

  clearAll() {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = false;
      }
    });
    this.state.topicsList.tags.forEach((prefer) => (prefer.isChecked = false));
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
    });
    this.filteringNewsList();
  }

  bgBinding(bgList) {
    /*let bg = "";
    bgList.forEach((data) => {
      let bgarr = data.split('/');
      if (bgarr[1] == "business-group") {
        bg += bgarr[bgarr.length - 1] + " | ";
      }
    })
    return bg.substring(0, bg.length - 3); */
    var title = "";
    bgList.filter((id, i) => {
      this.state.businessGroupIdTitle.forEach((obj) => {
        if (Object.keys(obj) == id) {
          if (i == bgList.length - 1) {
            title = title + obj[id];
          } else {
            title = title + obj[id] + " | ";
          }

          // return obj[id];
        }
      });
    });
    return title;
  }

  dateTransform(date) {
    let monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    return monthName[m] + " " + d;
    // return moment(date).format('MMM DD');
  }

  tagSorting() {
    let businessTag = [];
    let topicsTag = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.selectedPreferenceList.forEach((element) => {
        if (
          element.split("/")[1] == "business-group" &&
          element != "sunlife:source/business-group/canada"
        ) {
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
      selectedPreferenceTags: this.state.selectedPreferenceTags,
    });
  }

  getNewsList() {
    $.ajax({
      type: "GET",
      url: `/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.news.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.newsList = response;
        if (ContextHub.getItem('profile').businessGroup && ContextHub.getItem('profile').businessUnit && ContextHub.getItem('profile').buildingLocation && ContextHub.getItem('profile').jobLevel) {
          var businessGroup = ContextHub.getItem('profile').businessGroup;
          businessGroup = "sunlife:source/business_group/" + businessGroup.toLowerCase().replace(" ", "-");
          var businessUnit = ContextHub.getItem('profile').businessUnit;
          var buildingLocation = ContextHub.getItem('profile').buildingLocation;
          var jobLevel = ContextHub.getItem('profile').jobLevel;
          var userProfileFilters = [];
          userProfileFilters.push(businessGroup, businessUnit, buildingLocation, jobLevel);
          this.state.newsList = this.state.newsList.filter((news) => {
            return (!news.pinArticle && news.tags && userProfileFilters.every(val => news.tags.includes(val)));
          })
        }
        let pinnedNewsList = [];
        let preferedNewsList = [];
        if (this.state.selectedPreferenceList.length > 0) {
          preferedNewsList = this.state.newsList.filter((news) => {
            return (
              !news.pinArticle &&
              news.tags &&
              news.tags.some(
                (val) => this.state.selectedPreferenceList.indexOf(val) > -1
              )
            );
          });
          pinnedNewsList = this.state.newsList.filter((news) => {
            return (
              news.pinArticle &&
              news.tags &&
              news.tags.some(
                (val) => this.state.selectedPreferenceList.indexOf(val) > -1
              )
            );
          });
        } else {
          preferedNewsList = this.state.newsList;
        }
        pinnedNewsList.sort(function (a, b) {
          return (
            a.pinArticle - b.pinArticle ||
            b.publishedDate - a.publishedDate ||
            a.heading.localeCompare(b.heading)
          );
        });
        preferedNewsList.sort(function (a, b) {
          return (
            b.publishedDate - a.publishedDate ||
            a.heading.localeCompare(b.heading)
          );
        });
        if (pinnedNewsList.length > 0) {
          this.state.filterNewsList = this.mergeArray(
            preferedNewsList,
            pinnedNewsList,
            pinnedNewsList[0].pinArticle - 1
          );
        }
        this.setState({
          newsList: this.state.newsList,
          filterNewsList: this.state.filterNewsList,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPreferenceList() {
    $.ajax({
      type: "GET",
      url: `/content/cq:tags/sunlife/source.tags.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.businessGroupList = response["business-group"];
        this.state.topicsList = response["topic"];
        this.state.businessGroupList.tags.forEach((data) => {
          var obj = {};
          obj[data.id] = data.title;
          this.state.businessGroupIdTitle.push(obj);
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach((prefer) => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          });
        });
        this.state.topicsList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach((prefer) => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          });
        });
        this.setState({
          businessGroupList: this.state.businessGroupList,
          topicsList: this.state.topicsList,
          businessGroupIdTitle: this.state.businessGroupIdTitle,
        });
        this.getNewsList();
        //console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addSelectedPreference() {
    /* submit analytics starts here */
    var businessString = '', topicString = '';
    //console.log(this.state.selectedPreferenceList);
    if (this.state.selectedPreferenceList.length > 0) {
      console.log('inside');
      this.state.selectedPreferenceList.forEach((item, index) => {
        if (item.indexOf('business-group') > -1) {
          businessString += item + ',';
        } else if (item.indexOf('topics')) {
          topicString += item + ',';
        }
      });
    }
    console.log(businessString[businessString.length - 1]);
    if (businessString[businessString.length - 1] == ',') {
      businessString = businessString.substring(0, businessString.length - 1);
    }
    if (topicString[topicString.length - 1] == ',') {
      topicString = topicString.substring(0, topicString.length - 1);
    }
    utag.link({
      ev_type: 'other',
      ev_action: 'clk',
      ev_title: 'news-preferences',
      ev_data_one: businessString,
      ev_data_two: topicString
    });
    /* submit analytics ends here */
    let reqData = {
      articlefilter: this.state.selectedPreferenceList,
    };
    $.ajax({
      type: "POST",
      url:
        "/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.ugc.addPreference.json",
      contentType: "application/json",
      data: JSON.stringify(reqData),
      dataType: "json",
      success: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  retrieveSelectedPreference() {
    $.ajax({
      type: "GET",
      url:
        "/content/sunlife/internal/source/en/news/jcr:content/root/layout_container/container1/generic.ugc.retrievePreference.json",
      dataType: "json",
      success: (res) => {
        this.state.selectedPreferenceList = res;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        });
        this.getPreferenceList();
        //console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getNewsTilesData() {
    this.retrieveSelectedPreference();
  }

  mergeArray(a, b, i) {
    return a.slice(0, i).concat(b, a.slice(i));
  }
  newsTileClick(key, index, event) {
    //console.log(this.state.filterNewsList);
    /* homepage analytics starts here */
    utag.link({
      ev_type: "other",
      ev_action: "clk",
      ev_title: this.state.filterNewsList[key].heading,
      ev_data_one: "hp-news-" + index,
    });
    /* homepage analytics ends here */
    location.href = this.state.filterNewsList[key].pagePath;
  }
  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "
            data-analytics="tab0"
          >
            <div class="news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" && (
                <div>
                  <div class="row news-tool-bar">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                      <p class="left-text pull-left">
                        {this.props.toolbarLeftText}
                      </p>
                      <div class="preference-tag-container hidden-sm hidden-xs">
                        {this.state.selectedPreferenceTags
                          .slice(0, 4)
                          .map((value, index) => {
                            return <span class="tag">{value}</span>;
                          })}
                        {this.state.selectedPreferenceTags.length > 4 && (
                          <span class="more-tag">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4
                            }`}</span>
                        )}
                      </div>
                      <span class="pull-right">
                        {this.state.selectedPreferenceTags.length > 0 && (
                          <span class="hidden-md hidden-lg">
                            ({this.state.selectedPreferenceTags.length})
                          </span>
                        )}
                        <a
                          class="right-text"
                          data-target="#preferenceModal"
                          data-toggle="modal"
                          id="preferenceModalLink"
                          href="#preferenceModal"
                        >
                          {this.props.toolbarRightText}
                          <span class={`fa ${this.props.iconName}`}></span>
                        </a>
                      </span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
                  </div>
                  <div
                    id="preferenceModal"
                    class="modal fade preference-popup-wrapper horizontal-middle-align"
                    role="dialog"
                  >
                    <div class="modal-dialog preference-modaldialog">
                      <div class="modal-content horizontal-middle-align">
                        <div class="modal-header preference-modal-header">
                          <button
                            type="button"
                            class="fa fa-remove collapse-x close-modal"
                            aria-label="Close"
                            data-dismiss="modal"
                          ></button>
                          <h5 class="heading-text">
                            {this.props.preferenceModalHeading}
                          </h5>
                          <p>
                            <input
                              type="checkbox"
                              id="selectAll"
                              onChange={this.handleAllChecked}
                              name="selectAll"
                              checked={this.state.allChecked}
                              value="selectAll"
                            />
                            <span class="chk-lbl">
                              {this.props.selectAllText}
                            </span>
                          </p>
                        </div>
                        <div class="modal-body preference-modal-body">
                          <div class="row preference-list">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <p class="heading-text">
                                {this.state.businessGroupList.title}
                              </p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.tags.map(
                                  (value, index) => {
                                    return (
                                      <li key={index}>
                                        <input
                                          type="checkbox"
                                          name={value.id}
                                          value={value.id}
                                          onChange={
                                            this.handleCheckChildElement
                                          }
                                          checked={value.isChecked}
                                          disabled={
                                            value.isChecked &&
                                            value.title === this.state.defaultBG
                                          }
                                        />
                                        <span class="chk-lbl">
                                          {value.title}
                                        </span>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">
                                {this.state.topicsList.title}
                              </p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.tags.map(
                                  (value, index) => {
                                    return (
                                      <li key={index}>
                                        <input
                                          type="checkbox"
                                          name={value.id}
                                          value={value.id}
                                          onChange={
                                            this.handleCheckChildElement
                                          }
                                          checked={value.isChecked}
                                        />
                                        <span class="chk-lbl">
                                          {value.title}
                                        </span>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer preference-modal-footer">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper primary-blue-button-form">
                              <button
                                class="cmp-form-button pull-right"
                                onClick={this.filteringNewsList}
                              >
                                {this.props.preferenceModalHeadingbtn1}
                              </button>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper secondary-button-form">
                              <button
                                class="cmp-form-button sec-btn"
                                onClick={this.clearAll}
                              >
                                {this.props.preferenceModalHeadingbtn2}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.props.newsListContainer == "true" &&
                this.state.filterNewsList.length > 0 && (
                  <div class="row news-list-container">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 dynamic-news-tile">
                      {Object.keys(this.state.filterNewsList)
                        .slice(0, 4)
                        .map((key, index) => {
                          return (
                            <div
                              class={`col-xs-12  tile clickable-tile ${index == 0
                                  ? "col-sm-8 col-md-8"
                                  : "col-sm-4 col-md-4"
                                }`}
                              onClick={this.newsTileClick.bind(
                                this,
                                key,
                                index + 1
                              )}
                            >
                              <div
                                class="tile-img"
                                style={{
                                  backgroundImage: `url(${index == 0 ? this.state.filterNewsList[key].thumbnailImageFeatured : this.state.filterNewsList[key].thumbnailImage})`,
                                }}
                              >
                                <div class="overlay-container">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 detail-container">
                                    <span class="title pull-left">
                                      {this.state.filterNewsList[key].heading}
                                    </span>
                                    <span class="date pull-right">
                                      {this.dateTransform(
                                        this.state.filterNewsList[key]
                                          .publishedDate
                                      )}
                                    </span>
                                  </div>
                                  <span class="bg-name">
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                        <div class="aggregate-tile">
                          <div class="circular-image">
                            <img class="icon" src={this.props.moreNewsImg} />
                          </div>
                          {Object.keys(this.state.filterNewsList)
                            .slice(4, 7)
                            .map((key, index) => {
                              return (
                                <div class="mar-btm">
                                  <a class="title" href="">
                                    {this.state.filterNewsList[key].heading}
                                  </a>
                                  <p class="bg-name">
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </p>
                                </div>
                              );
                            })}
                          <p>
                            <span class="blue-chevron-arrow">
                              <span class="blue-font">
                                <a href={this.props.moreNewsLink}>
                                  {this.props.moreNewsText}
                                </a>
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 static-news-tile">
                      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workday-tile">
                        <p>
                          <a href={this.props.workdayLink}>
                            <img src={this.props.workdayImg} alt="" />
                          </a>
                        </p>
                        <p>{this.props.workdayText}</p>
                        <p>
                          <a href={this.props.workdayLink} target="_blank">
                            <span class="view-all-category white-font">
                              {this.props.workdayLinkText}
                            </span>
                          </a>
                        </p>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workplace-tile">
                        <p>
                          <a href={this.props.workplaceLink}>
                            <img src={this.props.workplaceImg} alt="" />
                          </a>
                        </p>
                        <p class="m-top-bt">{this.props.workplaceText}</p>
                        <p>
                          <span class="blue-chevron-arrow">
                            <span class="blue-font">
                              <a
                                href={this.props.workplaceLink}
                                target="_blank"
                              >
                                {this.props.workplaceLinkText}
                              </a>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
reactComponents["news-tiles"] = NewsTiles;
