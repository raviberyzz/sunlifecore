class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      businessGroupList: [],
      topicsList: [],
      tabHeading: [],
      allChecked: false,
      selectedPreferenceList: ["sunlife:source/business-groups/canada"],
      newsList: [
        {
          "articlePublishedDate": 1584037800000,
          "newsroomHeading": "How to raise a Healthy family",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1584037800000,
          "newsroomHeading": "Insights from the DHS - A Customer Journey",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/es", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/us", "sunlife:source/business-groups/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "Inclusive work spaces",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "Dean's Message",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/digital-enterprise"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "5 ways to avoid burnout",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "How to talk to your boss about your mental health",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/general-HR"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "What you need to know before you see a therapist",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/es", "sunlife:source/business-groups/slc", "sunlife:source/business-groups/us", "sunlife:source/topics/diversity-&-inclusion"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 1",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/about-us_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/business-groups/uk", "sunlife:source/topics/innovation"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 2",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/awards-recognition_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/business-groups/philippines", "sunlife:source/topics/general-HR", "sunlife:source/topics/my-learning"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 3",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/topics/my-benefits-and-wellness", "sunlife:source/topics/company-performance", "sunlife:source/topics/business-continuity"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        }, {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 4",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/leadership_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 5",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/istock-84413525-awards-and-recognition-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/business-groups/hong-kong", "sunlife:source/topics/digital-enterprise", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 6",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/business-groups/uk", "sunlife:source/topics/employee-engagement"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 7",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Investors/M19-016-InvestorDay_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/my-benefits-and-wellness"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 8",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/topics/philanthropy-sponsorship"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 9",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/business-groups/corporate", "sunlife:source/topics/sustainability"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 10",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 11",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/business-groups/es", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/us", "sunlife:source/business-groups/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 12",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 13",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/digital-enterprise"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 14",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 15",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/general-HR"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 16",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/innovation_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/business-groups/es", "sunlife:source/business-groups/slc", "sunlife:source/business-groups/us", "sunlife:source/topics/diversity-&-inclusion"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 17",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 18",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 19",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/corporate", "sunlife:source/topics/general-HR"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 20",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 21",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/my-career"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 22",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 23",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 24",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 25",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/my-career"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 26",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_girlblueshirtsmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/my-benefits-and-wellness"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 27",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 28",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 29",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 30",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 31",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 32",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 33",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 34",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_slfteamneworleans_275w_176h.jpg",
          "cq:tags": ["sunlife:source/business-groups/hong-kong", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 35",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/digital-enterprise"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 36",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 37",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 38",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 39",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 40",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 41",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 42",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_3adultsinsuitssmiling_140w_114h.jpg",
          "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/topics/digital-enterprise"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 43",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 44",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 45",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 46",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 47",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 48",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 49",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1514917800000,
          "newsroomHeading": "News article 50",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_statuepraying_199w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 51",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 52",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 53",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 54",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 55",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/my-career", "sunlife:source/topics/recognition"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 56",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 57",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 58",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article2",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/global/images/photos/photo_towerspark_198w_193h.jpg",
          "cq:tags": ["sunlife:source/business-groups/philippines", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 59",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/sustainability"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 60",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1577817000000,
          "newsroomHeading": "News article 61",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 62",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/sustainability"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 63",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 64",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 65",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 66",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 67",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/sustainability"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 68",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/topics/sustainability"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 69",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 70",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 71",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/business-critical"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583778600000,
          "newsroomHeading": "News article 72",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 73",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 74",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 75",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 76",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
          "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 77",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 78",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1546281000000,
          "newsroomHeading": "News article 79",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 80",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/philanthropy-sponsorship"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 81",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 82",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article3",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/diversity-inclusion_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/us", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 83",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/employee-engagement"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 84",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 85",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 86",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/company-performance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 87",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 88",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 89",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/employee-engagement"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 90",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/Newsroom/istock-76472107-newsroom-og-1200x628.jpg",
          "cq:tags": ["sunlife:source/business-groups/uk", "sunlife:source/topics/organization-announcements"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 91",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/client-stories"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 92",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/business-continuity"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 93",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/corporate-real-estate"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 94",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/compliance"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 95",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/business-continuity"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 96",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/business-continuity"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 97",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/business-continuity"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
        },
        {
          "articlePublishedDate": 1583346600000,
          "newsroomHeading": "News article 98",
          "newsroomPagePath": "/content/sunlife/internal/source/en/news/article1",
          "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/In%20the%20community/sustainability_220x220.jpg",
          "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/topics/covid-19"],
          "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
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
    this.filteringNewsList = this.filteringNewsList.bind(this);
    this.paginationDataBuild = this.paginationDataBuild.bind(this);
    this.tagSorting = this.tagSorting.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
    this.getTabsHeading();
    this.tagSorting();
  }

  handleAllChecked(event) {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.state.topicsList.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  filteringNewsList() {
    this.state.selectedPreferenceList = [];
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.value);
      }
    })
    this.state.topicsList.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.value);
      }
    })
    this.state.filterNewsList = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.filterNewsList = this.state.newsList.filter((news) => {
        return news["cq:tags"].some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
      });
    } else {
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function (a, b) {
      return (b.articlePublishedDate - a.articlePublishedDate || a.newsroomHeading.localeCompare(b.newsroomHeading));
    });
    this.getTabsHeading();
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList
    });
    this.tagSorting();
    $("#preferenceModal").modal("hide");
  }

  clearAll() {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = false;
      }
    })
    this.state.topicsList.forEach(prefer => prefer.isChecked = false)
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
    this.filteringNewsList();
    this.getTabsHeading();
  }

  dateTransform(date) {
    let monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    return monthName[m] + " " + d;
    // return moment(date).format('MMMM DD, YYYY');
  }

  bgBinding(bgList) {
    let bg = "";
    bgList.forEach((data) => {
      let bgarr = data.split('/');
      if (bgarr[1] == "business-groups") {
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
        if (new Date(news.articlePublishedDate).getFullYear() === yearVal) {
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
        if (element.includes("business-groups") && element != "sunlife:source/business-groups/canada") {
          businessTag.push(element);
        } else if (element.includes("topics")) {
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
      console.log(this.state.selectedPreferenceTags);
    }
    this.setState({
      selectedPreferenceTags: this.state.selectedPreferenceTags
    });
  }

  newsTiles() {
    let businessGroupObj = [
      { name: "Canada", value: "sunlife:source/business-groups/canada" },
      { name: "Corporate", value: "sunlife:source/business-groups/corporate" },
      { name: "Enterprise Services", value: "sunlife:source/business-groups/enterprise-services" },
      { name: "Hong Kong", value: "sunlife:source/business-groups/hong-kong" },
      { name: "Indonesia", value: "sunlife:source/business-groups/indonesia" },
      { name: "International", value: "sunlife:source/business-groups/international" },
      { name: "Philippines", value: "sunlife:source/business-groups/philippines" },
      { name: "SLC Management", value: "sunlife:source/business-groups/slc-management" },
      { name: "Asia", value: "sunlife:source/business-groups/asia" },
      { name: "U.S.", value: "sunlife:source/business-groups/us" },
      { name: "U.K.", value: "sunlife:source/business-groups/uk" },
      { name: "Vietnam", value: "sunlife:source/business-groups/vietnam" }
    ];
    let topicsObj = [
      { name: "Business continuity", value: "sunlife:source/topics/business-continuity" },
      { name: "Business critical", value: "sunlife:source/topics/business-critical" },
      { name: "Client stories", value: "sunlife:source/topics/client-stories" },
      { name: "Company performance", value: "sunlife:source/topics/company-performance" },
      { name: "Compliance", value: "sunlife:source/topics/compliance" },
      { name: "Corporate Real Estate", value: "sunlife:source/topics/corporate-real-estate" },
      { name: "COVID-19", value: "sunlife:source/topics/covid-19" },
      { name: "Digital Enterprise", value: "sunlife:source/topics/digital-enterprise" },
      { name: "Diversity & Inclusion", value: "sunlife:source/topics/diversity-&-inclusion" },
      { name: "Employee engagement", value: "sunlife:source/topics/employee-engagement" },
      { name: "General HR", value: "sunlife:source/topics/general-HR" },
      { name: "Innovation", value: "sunlife:source/topics/innovation" },
      { name: "My Benefits and Wellness", value: "sunlife:source/topics/my-benefits-and-wellness" },
      { name: "My Career", value: "sunlife:source/topics/my-career" },
      { name: "My Learning", value: "sunlife:source/topics/my-learning" },
      { name: "My Pay", value: "sunlife:source/topics/my-pay" },
      { name: "Organization announcements", value: "sunlife:source/topics/organization-announcements" },
      { name: "Philanthropy/Sponsorship", value: "sunlife:source/topics/philanthropy-sponsorship" },
      { name: "Recognition", value: "sunlife:source/topics/recognition" },
      { name: "Sustainability", value: "sunlife:source/topics/sustainability" },
      { name: "Technology", value: "sunlife:source/topics/technology" }
    ];
    businessGroupObj.forEach((data) => {
      data["isChecked"] = false;
      this.state.selectedPreferenceList.forEach(prefer => {
        if (prefer === data.value) {
          data["isChecked"] = true;
        }
      })
    });
    topicsObj.forEach((data) => {
      data["isChecked"] = false;
      this.state.selectedPreferenceList.forEach(prefer => {
        if (prefer === data.value) {
          data["isChecked"] = true;
        }
      })
    });
    this.state.filterNewsList = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.filterNewsList = this.state.newsList.filter((news) => {
        return news["cq:tags"].some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
      });
    } else {
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function (a, b) {
      return (b.articlePublishedDate - a.articlePublishedDate || a.newsroomHeading.localeCompare(b.newsroomHeading));
    });
    this.setState({
      filterNewsList: this.state.filterNewsList,
      businessGroupList: businessGroupObj,
      topicsList: topicsObj,
    })
  }

  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
            <div class="displayStockTicker news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" &&
                <div>
                  <div class="row news-tool-bar">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                      <p class="left-text pull-left">{this.props.toolbarLeftText}</p>
                      {/* <div class="preference-tag-container hidden-sm hidden-xs">
                        {this.state.selectedPreferenceTags.map((value, index) => {
                          return (<span class="tag">{value}</span>)
                        })}
                        {this.state.selectedPreferenceTags.length > 3 &&
                          <span class="more-tag">{`More - ${this.state.selectedPreferenceTags.length}`}</span>
                        }
                      </div> */}
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
                            <span class="chk-lbl">Select all</span>
                          </p>
                        </div>
                        <div class="modal-body preference-modal-body">
                          <div class="row preference-list">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <p class="heading-text">Business Group</p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.isChecked && value.name === 'Canada'} />
                                      <span class="chk-lbl">{value.name}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">Topic</p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} />
                                      <span class="chk-lbl">{value.name}</span>
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
                              <button class="cmp-form-button pull-right" onClick={this.filteringNewsList}>{this.props.preferenceModalHeadingbtn1}</button>
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
                                      <p>{this.dateTransform(this.state.tabHeading[value].data[key].articlePublishedDate) + this.bgBinding(this.state.tabHeading[value].data[key]["cq:tags"])}</p>
                                      <p>
                                        <a href={this.state.tabHeading[value].data[key].newsroomPagePath}>{this.state.tabHeading[value].data[key].newsroomHeading}</a>
                                      </p>
                                      <p>{this.state.tabHeading[value].data[key].content}</p>
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
                                              <span>Previous</span>
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
                                            <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage + 1)}>Next</a>
                                          </li>
                                        }
                                      </ul>
                                      <div class="pagination-indicator">
                                        {`Page ${this.state.tabHeading[value].pageData.currentPage} of ${this.state.tabHeading[value].pageData.totalPage}`}
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