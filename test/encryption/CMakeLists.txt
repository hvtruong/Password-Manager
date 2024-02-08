add_subdirectory(gtest)

enable_testing()

add_executable(runAllTests mytests.cpp)

target_link_libraries(runAllTests
  gmock gtest gtest_main
)

add_test(NAME AllTests COMMAND runAllTests)