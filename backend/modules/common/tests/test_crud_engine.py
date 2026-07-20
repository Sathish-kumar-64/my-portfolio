from django.test import TestCase
from django.contrib.auth import get_user_model
from modules.projects.models import Project
from modules.contact.models import ContactMessage

User = get_user_model()

class GenericCRUDEngineTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")

    def test_soft_delete_functionality(self):
        project = Project.objects.create(
            title="Testing ERP Engine",
            short_description="Short desc",
            description="Full desc",
            category="fullstack"
        )
        self.assertTrue(project.is_active)
        self.assertEqual(Project.objects.count(), 1)

        # Soft delete
        project.delete(soft=True)
        self.assertFalse(project.is_active)
        # SoftDeleteManager should filter out soft-deleted items
        self.assertEqual(Project.objects.count(), 0)
        # All objects manager should still retain record
        self.assertEqual(Project.all_objects.count(), 1)

    def test_contact_message_creation(self):
        msg = ContactMessage.objects.create(
            name="Alice Smith",
            email="alice@example.com",
            subject="Job Offer",
            message="We would love to hire you as a Senior Engineer."
        )
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertFalse(msg.is_read)
