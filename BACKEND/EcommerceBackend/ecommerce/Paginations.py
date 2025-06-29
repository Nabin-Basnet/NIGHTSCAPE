# from rest_framework.pagination import PageNumberPagination
# from rest_framework.response import Response

# class CustomPagination(PageNumberPagination):
#     page_size_query_param='page_size'
#     page_query_param='page_num'
#     max_page_size=5

#     def get_paginated_response(self, data):
#         return Response({
#             'next':self.get_next_link(),
#             'previous':self.get_previous_link(),
#             'count':self.page.paginator.count,
#             'page_size':self.page_size,
#             'result':data
#         })
    

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 2  # Default page size
    page_size_query_param = 'page_size'  # Allow client to set page size (optional)
    max_page_size = 100  # Maximum page size

    def get_paginated_response(self, data):
        return Response({
            'status': True,
            'total_items': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
