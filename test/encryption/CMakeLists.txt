add_executable(
        mytest
        test/mytest.cpp
)
target_link_libraries(
        mytest
        gtest_main
)