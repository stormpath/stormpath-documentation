Authorization With Stormpath
============================

What is Authorization?
----------------------

Authorization is simply the way in which we determine the permissions
someone has to do something. In contrast to Authentication, which is how
we determine who a person is, authorization is how we determine what
they are or aren't able to do. Perhaps the most accessible example of
this process is at the airport, where a security person first checks
your passport to make sure that you are who you say you are, and a
separate person later checks that you have a valid plane ticket, which
authorizes you to board the plane.

In the Stormpath context, once a user has entered in a valid login and
password (authentication), they must then be assigned permissions
(authorization) which dictate what access rights they have to your
system resources. Permissions, at their most basic, are statements of
functionality that define a resource and what actions are possible for
that resource. Going back to our airport scenario, the permission could
be to perform the "board" action onto a specific flight number.

The many ways Stormpath allows you to define, assign, and manage these
permissions is the subject of this guide. Additionally, the last
sections of this guide also include information about authorizing
someone to use your app using Social and LDAP login.

How do I use Groups to model Authorization?
-------------------------------------------

The Group resource is central to controlling authorization with
Stormpath. Among other things, you can use Groups can to set implicit
permissions, permission hierarchies, and create user roles that span
every tenant that is using your application.

Explicit and Implicit Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Stormpath comes out-of-the-box with support for both explicit and
implicit authorization. Explicit authorization is the
individually-specified permission of a user to do something, whereas
implicit authorization can be thought of as permissions inherited by
virtue of belonging to a certain Group. Both explicit and implicit
authorization are available in Stormpath, via either explicit Account
Permissions or implicit Group Permissions (for Role-Based Access
Control).

Explicit user permissions are set on the Account level. This type of
authorization is best suited for fine-grained permissions that are
unique to a user.

As we have already said, you can think of Groups as labels applied to
Accounts via the GroupMembership resource. Much in the same way that a
label can be used to define an officer's rank (and thereby what he is
authorized to do), Groups are how Roles are defined in Stormpath for the
purposes of Role-Based Access Control. If a user Group can be thought of
as a collection of Users, then a role Group can be thought of as a
collection or permissions. An Account can be associated with multiple
Groups and will inherit permissions from all of them.

More information about creating custom permissions on both the Account
and Group level can be found in the Custom Permissions section found
`below <#customperms>`__.

Group Hierarchies
~~~~~~~~~~~~~~~~~

In the context of Stormpath's database, Groups, like labels, are
inherently "flat". This means that they do not by default include any
kind of hierarchy. If a hierarchical or nested structure is desired, it
can be simulated in one of two ways: Either, using the Group resource's
``description`` field, or with the Group's associated customData
resource. A geographical region can, for example, be represented as
``"SysAdmin/SpaceAdmin/User"`` in the Group's ``"description"`` field,
allowing for queries to be made using simple pattern-matching queries.
It can also be included in the customData resource, as a series of
key-value relations. The downside to this second approach is that
customData resources are not currently searchable in the same manner as
the Group's ``description`` field is.

For more information on this, please see `How do I model nested or
hierarchical
groups? <https://support.stormpath.com/hc/en-us/articles/203697466-How-do-I-model-nested-or-hierarchical-Groups->`__.

Application-Wide Groups
~~~~~~~~~~~~~~~~~~~~~~~

In a SaaS application, it is easy to imagine a scenario where you might
want to have user Accounts segregated based upon the organization that
they belong to, while at the same time defining permissions based on
broader, application-wide role Groups. In the Stormpath data model, it
is recommended to model every organization (or "Tenant") that uses your
Application as a Group (this is further explained below in the
`Multi-Tenancy <#multitenant>`__ chapter). However, even with a Tenant
Group for every organization, it is also possible to define
Application-wide Groups that allow for roles that span the entire
Application, regardless of which Tenant Group a user's Account is
associated with.

For example, your Application resource has a single Directory assigned
to it, and multiple Groups assigned to that, one for each Tenant using
the application. So there is an "OrganizationA" Group, and another
"OrganizationB" Group. If you want your Application to have "Regular
User" and "Admin" Roles with their own permissions defined for all of
your Application's users, this is simply a matter of creating two role
Groups with their own customData permissions defined. Then any Account,
regardless of the Tenant Group that they are assigned to, can also be
assigned to the Application-wide "Regular User" or "Admin" role Group.

More information about the APIs that allow you to create, retrieve and
search an Application's groups can be found in the `REST API Product
Guide <http://docs.stormpath.com/rest/product-guide/#application-groups>`__,
while more information about Multi-Tenancy can be found
`below <#multitenant>`__ and in the `Guide to SaaS User
Management <http://docs.stormpath.com/guides/multi-tenant/>`__.

How do I use customData to model fine-grained permissions?
----------------------------------------------------------

As mentioned in the Data Model section above, Stormpath resources like
Accounts and Groups are created along with a linked ``customData``
resource. This resource is very useful for implementing both explicit
Account permissions and implicit role Group permissions. Essentially,
any user-level permissions are defined in a ``customData`` resource
linked to a user Account, while any role-level permissions are defined
in a ``customData`` resource linked to a role Group. This allows for
Stormpath to model user-unique permissions as well as permissions
inherited by virtue of a user having one (or more) roles.

The permissions themselves are then contained in these separate
``customData`` resources. Permissions, you'll remember, are statements
of functionality that define a resource and what actions are possible
for that resource. Permissions in Stormpath can be modelled as an array
inside the ``customData`` resource. They can be as simple as a key-value
pair, or more complex objects.

To expand on the scenario from the `Application-Wide
Groups <#appgroups>`__ section above, a user Account for the user
"Riker" could have their user-unique permissions defined in a
``customData`` resource linked to from their Account. At the same time,
their Account would be linked to the application-wide "Admin" Group
which would have its own linked ``customData`` resource that would
contain definitions of the permissions of all the users with the Admin
role in your application.

For more information about working with Custom Data please see the
`Product
Guide <http://docs.stormpath.com/rest/product-guide/#custom-data>`__,
and for more information specifically about managing permissions with
Custom Data please see `this blog
post <https://stormpath.com/blog/fine-grained-permissions-with-customData/>`__.
#Authorization With Stormpath

What is Authorization?
----------------------

Authorization is simply the way in which we determine the permissions
someone has to do something. In contrast to Authentication, which is how
we determine who a person is, authorization is how we determine what
they are or aren't able to do. Perhaps the most accessible example of
this process is at the airport, where a security person first checks
your passport to make sure that you are who you say you are, and a
separate person later checks that you have a valid plane ticket, which
authorizes you to board the plane.

In the Stormpath context, once a user has entered in a valid login and
password (authentication), they must then be assigned permissions
(authorization) which dictate what access rights they have to your
system resources. Permissions, at their most basic, are statements of
functionality that define a resource and what actions are possible for
that resource. Going back to our airport scenario, the permission could
be to perform the "board" action onto a specific flight number.

The many ways Stormpath allows you to define, assign, and manage these
permissions is the subject of this guide. Additionally, the last
sections of this guide also include information about authorizing
someone to use your app using Social and LDAP login.

How do I use Groups to model Authorization?
-------------------------------------------

The Group resource is central to controlling authorization with
Stormpath. Among other things, you can use Groups can to set implicit
permissions, permission hierarchies, and create user roles that span
every tenant that is using your application.

Explicit and Implicit Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Stormpath comes out-of-the-box with support for both explicit and
implicit authorization. Explicit authorization is the
individually-specified permission of a user to do something, whereas
implicit authorization can be thought of as permissions inherited by
virtue of belonging to a certain Group. Both explicit and implicit
authorization are available in Stormpath, via either explicit Account
Permissions or implicit Group Permissions (for Role-Based Access
Control).

Explicit user permissions are set on the Account level. This type of
authorization is best suited for fine-grained permissions that are
unique to a user.

As we have already said, you can think of Groups as labels applied to
Accounts via the GroupMembership resource. Much in the same way that a
label can be used to define an officer's rank (and thereby what he is
authorized to do), Groups are how Roles are defined in Stormpath for the
purposes of Role-Based Access Control. If a user Group can be thought of
as a collection of Users, then a role Group can be thought of as a
collection or permissions. An Account can be associated with multiple
Groups and will inherit permissions from all of them.

More information about creating custom permissions on both the Account
and Group level can be found in the Custom Permissions section found
`below <#customperms>`__.

Group Hierarchies
~~~~~~~~~~~~~~~~~

In the context of Stormpath's database, Groups, like labels, are
inherently "flat". This means that they do not by default include any
kind of hierarchy. If a hierarchical or nested structure is desired, it
can be simulated in one of two ways: Either, using the Group resource's
``description`` field, or with the Group's associated customData
resource. A geographical region can, for example, be represented as
``"SysAdmin/SpaceAdmin/User"`` in the Group's ``"description"`` field,
allowing for queries to be made using simple pattern-matching queries.
It can also be included in the customData resource, as a series of
key-value relations. The downside to this second approach is that
customData resources are not currently searchable in the same manner as
the Group's ``description`` field is.

For more information on this, please see `How do I model nested or
hierarchical
groups? <https://support.stormpath.com/hc/en-us/articles/203697466-How-do-I-model-nested-or-hierarchical-Groups->`__.

Application-Wide Groups
~~~~~~~~~~~~~~~~~~~~~~~

In a SaaS application, it is easy to imagine a scenario where you might
want to have user Accounts segregated based upon the organization that
they belong to, while at the same time defining permissions based on
broader, application-wide role Groups. In the Stormpath data model, it
is recommended to model every organization (or "Tenant") that uses your
Application as a Group (this is further explained below in the
`Multi-Tenancy <#multitenant>`__ chapter). However, even with a Tenant
Group for every organization, it is also possible to define
Application-wide Groups that allow for roles that span the entire
Application, regardless of which Tenant Group a user's Account is
associated with.

For example, your Application resource has a single Directory assigned
to it, and multiple Groups assigned to that, one for each Tenant using
the application. So there is an "OrganizationA" Group, and another
"OrganizationB" Group. If you want your Application to have "Regular
User" and "Admin" Roles with their own permissions defined for all of
your Application's users, this is simply a matter of creating two role
Groups with their own customData permissions defined. Then any Account,
regardless of the Tenant Group that they are assigned to, can also be
assigned to the Application-wide "Regular User" or "Admin" role Group.

More information about the APIs that allow you to create, retrieve and
search an Application's groups can be found in the `REST API Product
Guide <http://docs.stormpath.com/rest/product-guide/#application-groups>`__,
while more information about Multi-Tenancy can be found
`below <#multitenant>`__ and in the `Guide to SaaS User
Management <http://docs.stormpath.com/guides/multi-tenant/>`__.

How do I use customData to model fine-grained permissions?
----------------------------------------------------------

As mentioned in the Data Model section above, Stormpath resources like
Accounts and Groups are created along with a linked ``customData``
resource. This resource is very useful for implementing both explicit
Account permissions and implicit role Group permissions. Essentially,
any user-level permissions are defined in a ``customData`` resource
linked to a user Account, while any role-level permissions are defined
in a ``customData`` resource linked to a role Group. This allows for
Stormpath to model user-unique permissions as well as permissions
inherited by virtue of a user having one (or more) roles.

The permissions themselves are then contained in these separate
``customData`` resources. Permissions, you'll remember, are statements
of functionality that define a resource and what actions are possible
for that resource. Permissions in Stormpath can be modelled as an array
inside the ``customData`` resource. They can be as simple as a key-value
pair, or more complex objects.

To expand on the scenario from the `Application-Wide
Groups <#appgroups>`__ section above, a user Account for the user
"Riker" could have their user-unique permissions defined in a
``customData`` resource linked to from their Account. At the same time,
their Account would be linked to the application-wide "Admin" Group
which would have its own linked ``customData`` resource that would
contain definitions of the permissions of all the users with the Admin
role in your application.

For more information about working with Custom Data please see the
`Product
Guide <http://docs.stormpath.com/rest/product-guide/#custom-data>`__,
and for more information specifically about managing permissions with
Custom Data please see `this blog
post <https://stormpath.com/blog/fine-grained-permissions-with-customData/>`__.
