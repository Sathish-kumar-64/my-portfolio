from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from modules.projects.models import Project

class PortfolioAPITestCase(APITestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Portfolio Website",
            short_description="Full stack portfolio website",
            description="Built with Django REST and React 19",
            category="fullstack",
            tech_stack=["React 19", "Django"]
        )

    def test_get_projects_list(self):
        url = '/api/v1/projects/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['count'], 1)

    def test_get_skills_list(self):
        url = '/api/v1/skills/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_contact_message(self):
        url = '/api/v1/contact/'
        data = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Freelance Inquiry",
            "message": "Hi Sathish, I have an inquiry regarding a React & Django web application."
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
